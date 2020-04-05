import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Usuario, DBModels, _Usuario, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class UsuarioServicio {

    static authorize(rolM:_Usuario.RolEnum, rol?: _Usuario.RolEnum): Boolean {
        if(rol!=null && rol==_Usuario.RolEnum.ADMINISTRADOR) return true;
        if(rol!=null && rol==_Usuario.RolEnum.PROFESOR && rolM==_Usuario.RolEnum.ALUMNO) return true;
        return false;
    }

    static async autenticacion(req: ServerRequest, matricula: string, contrasena: string): Promise<APIResponse> {
        try{
            let usuario =  await req.query<Usuario>('Usuario').findOne({matricula});
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Seguridad - Solo un usuario habilitado puede iniciar secion
            if(usuario.estatus!=_Usuario.EstatusEnum.HABILITADO) throw new APIResponse(_APIResponse.FORBIDDEN);
            if(await bcrypt.compare(contrasena, usuario.contrasena)){
                let token = jwt.sign(JSON.stringify(new Token(usuario)), usuario.token);
                return new APIResponse(_APIResponse.OK, "Autenticado Exitosamente", {usuario: usuario.forJSON(), token} )
            }else{
                throw new APIResponse(_APIResponse.FORBIDDEN);
            }
        }catch(error){
            throw error;
        }
    }

    static async cerrarSesion(req: ServerRequest): Promise<APIResponse> {
        try{
            let matricula = req.usuarioToken.matricula;
            let usuario =  await req.query<Usuario>('Usuario').findOne({matricula});
            let token = generateCode(Defaults.codeAlphabet, Defaults.codeLength);
            await req.query<Usuario>('Usuario').patchAndFetchById(usuario.idUsuario, {token});
            return new APIResponse(_APIResponse.OK, "Sesion Cerrada Exitosamente");
        }catch(error){
            throw error;
        }
    }

    static async recuperacion(req: ServerRequest, matricula: string): Promise<APIResponse> {
        try{      
            // Diasble Anti-Virus and Enable https://myaccount.google.com/lesssecureapps  
            let usuarioCorreo = nodemailer.createTransport({
                service: process.env.MAIL_SERVICE,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                }
            });
            let confirmacionEnvio = await usuarioCorreo.sendMail({
                from: 'SIDVI ' + process.env.MAIL_USER,
                to: "omar.quintero.ms@gmail.com",
                subject: "Hello ✔",
                html: "<b>Hello world?</b>"
            });
                        

            return new APIResponse(_APIResponse.NOT_IMPLEMENTED);
        }catch(error){
            throw error;
        }
    }

    static async restablecer(req: ServerRequest, token: string, matricula: string, nuevaContrasena: string): Promise<APIResponse> {
        try{
            let usuario =  await req.query<Usuario>('Usuario').findOne({matricula});
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Seguridad - Solo un usuario habilitado puede recuperar su contraseña
            if(usuario.estatus!=_Usuario.EstatusEnum.HABILITADO) throw new APIResponse(_APIResponse.FORBIDDEN);
            //Seguridad - Solo un usuario autorizado puede cambiar la contraseña
            if(token==usuario.token){
                usuario.token = generateCode(Defaults.codeAlphabet, Defaults.codeLength);
                usuario.contrasena = await bcrypt.hash(nuevaContrasena, Defaults.saltRounds);   
                await req.query<Usuario>('Usuario').patchAndFetchById(usuario.idUsuario, usuario);
                return new APIResponse(_APIResponse.OK, "Recuperacion Exitosamente");
            }else{
                throw new APIResponse(_APIResponse.FORBIDDEN);
            }
        }catch(error){
            throw error;
        }
    }

    static async cambiarContrasena(req: ServerRequest, matricula: string, contrasena: string, nuevaContrasena: string): Promise<APIResponse> {
        try{
            let usuario =  await req.query<Usuario>('Usuario').findOne({matricula});
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Seguridad - Solo un usuario habilitado puede cambiar su contraseña
            if(usuario.estatus!=_Usuario.EstatusEnum.HABILITADO) throw new APIResponse(_APIResponse.FORBIDDEN);
            //Seguridad - Solo un usuario autorizado puede cambiar la contraseña            
            if(await bcrypt.compare(contrasena, usuario.contrasena)){
                usuario.contrasena = await bcrypt.hash(nuevaContrasena, Defaults.saltRounds);   
                await req.query<Usuario>('Usuario').patchAndFetchById(usuario.idUsuario, usuario);
                return new APIResponse(_APIResponse.OK, "Cambio su Contrasena Exitosamente");
            }else{
                throw new APIResponse(_APIResponse.FORBIDDEN);
            }
        }catch(error){
            throw error;
        }
    }

    static async listarUsuarios(req: ServerRequest, rol: _Usuario.RolEnum, matricula: string, nombreCompleto: string, estatus: _Usuario.EstatusEnum, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<Coleccion<Usuario>> {
        try{
            let query = req.query<Usuario>('Usuario').modify('defaultSelect'); 
            query = rol ? query.where({rol}) : query;
            query = matricula ? query.where('matricula', 'like', `%${matricula}%`) : query;
            query = nombreCompleto ? query.where('nombreCompleto', 'like', `%${nombreCompleto}%`) : query;
            query = estatus ? query.where({estatus}) : query;            
            let usuarios = await query.orderBy(ordenarPor, ordenarModo).page(indicePagina, tamanoPagina);
            let usuariosFormat = usuarios.results.map((item:any) => new Usuario(item).forJSON());
            return new Coleccion<Usuario>(usuariosFormat, usuarios.total);
        }catch(error){
            throw error;
        }
    }

    static async crearUsuario(req: ServerRequest, usuario: Usuario): Promise<APIResponse> {
        try{
            //Verificar que no exista
            if(await req.query<Usuario>('Usuario').findOne({matricula: usuario.matricula})!=null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La matricula ya existe");
            //Seguridad - Solo un usuario autorizado puede crear usuarios habilitados y profesores o administradores
            if(!UsuarioServicio.authorize(usuario.rol, req.usuarioToken.rol)){
                usuario.estatus = _Usuario.EstatusEnum.DESHABILITADO;
                usuario.rol = _Usuario.RolEnum.ALUMNO;                
            }
            
            deleteProperty(usuario, ['idUsuario']); 
            usuario.token = generateCode(Defaults.codeAlphabet, Defaults.codeLength);
            usuario.contrasena = await bcrypt.hash(usuario.contrasena, Defaults.saltRounds);            
            let newUsuario = await req.query<Usuario>('Usuario').insert(usuario);
            return new APIResponse(_APIResponse.CREATED, 'El usuario fue creado satisfactoriamente', {insertedId: newUsuario.idUsuario});
        }catch(error){
            throw error;
        }
    }

    static async obtenerUsuario(req: ServerRequest, idUsuario: number): Promise<Usuario>{
        try{            
            //Seguridad - Un alumno solo puede obtener datos de el mismo
            if(req.usuarioToken.rol==_Usuario.RolEnum.ALUMNO && req.usuarioToken.idUsuario!=idUsuario) 
                throw new APIResponse(_APIResponse.FORBIDDEN);

            let usuario =  await req.query<Usuario>('Usuario').findById(idUsuario);
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);            
            return usuario.forBase64();
        }catch(error){
            throw error;
        }
    }

    static async actualizarUsuario(req: ServerRequest, idUsuario: number, usuario: Usuario): Promise<APIResponse> {
        try{
            let oldUsuario = await req.query<Usuario>('Usuario').findById(idUsuario);
            //Verificar que Exista
            if(oldUsuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Seguridad - Solo un usuario autorizado puede cambiarlos datos de alguien
            if(!(req.usuarioToken.idUsuario==idUsuario || UsuarioServicio.authorize(oldUsuario.rol, req.usuarioToken.rol))) 
                throw new APIResponse(_APIResponse.FORBIDDEN);
            //Seguridad - Solo un usuario autorizado puede crear usuarios habilitados y profesores o administradores
            if(!UsuarioServicio.authorize(usuario.rol, req.usuarioToken.rol))
                deleteProperty(usuario, ['estatus', 'rol', 'matricula']);
            //Verificar que no exista
            if(usuario.matricula!=null && await req.query<Usuario>('Usuario').findOne({matricula: usuario.matricula})!=null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La matricula ya existe");            

            deleteProperty(usuario, ['idUsuario', 'contrasena', 'token']);
            await req.query<Usuario>('Usuario').patchAndFetchById(idUsuario, usuario);
            return new APIResponse(_APIResponse.UPDATED, "El Usuario fue actualizado");
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarUsuario(req: ServerRequest, idUsuario: number): Promise<APIResponse> {
        try{
            //Verificar que Exista
            if(await req.query<Usuario>('Usuario').findById(idUsuario)==null) 
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<Usuario>('Usuario').deleteById(idUsuario);
            return new APIResponse(_APIResponse.DELETED, "El Usuario fue eliminado correctamente");
        }catch(error){
            throw error;
        }
    }

    static async descargarUsuarioFoto(req: ServerRequest, idUsuario: number): Promise<Response<ArrayBuffer>> {
        try{           
            //Seguridad - Un alumno solo pueden ver datos de el mismo
            if(req.usuarioToken.rol==_Usuario.RolEnum.ALUMNO && req.usuarioToken.idUsuario!=idUsuario)
                throw new APIResponse(_APIResponse.FORBIDDEN);

            let usuario =  await req.query<Usuario>('Usuario').findById(idUsuario);
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            if(usuario.archivoFoto==null) throw new APIResponse(_APIResponse.NO_CONTENT, "No hay contenido para mostrar"); 
            return new Response(usuario.archivoFoto, _APIResponse.OK.statusCode, usuario.mimetypeFoto as ContentTypeEnum);
        }catch(error){
            throw error;
        }
    }

    static async cargarUsuarioFoto(req: ServerRequest, idUsuario: number, foto: any): Promise<APIResponse> {
        try {
            let usuario =  await req.query<Usuario>('Usuario').findById(idUsuario);
            //Verificar que Exista
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Seguridad - Solo un usuario aturoizado puede cambiar la informacion
            if(!(req.usuarioToken.idUsuario==idUsuario || UsuarioServicio.authorize(usuario.rol, req.usuarioToken.rol))) 
                throw new APIResponse(_APIResponse.FORBIDDEN);
            //Restriction - FileSize - ContentType
            if(foto.buffer.length>_Usuario.archivoFileSize) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite un documento tan grande");
            if(!_Usuario.archivoContentType.includes(foto.mimetype)) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite este formato");

            await req.query<Usuario>('Usuario').patchAndFetchById(idUsuario, { mimetypeFoto: foto.mimetype, archivoFoto: foto.buffer });
			return new APIResponse(_APIResponse.OK, 'Se ha subido el archivo');
		} catch (error) {
			throw error;
        }
    }

}