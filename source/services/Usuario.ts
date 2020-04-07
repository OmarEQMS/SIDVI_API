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

    static async autenticacion(req: ServerRequest, usuario: string, contrasena: string): Promise<APIResponse> {
        try{
            let _usuario =  await req.query<Usuario>('Usuario').modify('authorizationSelect').findOne({usuario});
            if(_usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);

            if(await bcrypt.compare(contrasena, _usuario.contrasena)){
                let token = jwt.sign(JSON.stringify(new Token(_usuario)), _usuario.token);
                return new APIResponse(_APIResponse.OK, "Autenticado Exitosamente", {usuario: new Usuario(_usuario).toJSON(), token} )
            }else{
                throw new APIResponse(_APIResponse.FORBIDDEN);
            }
        }catch(error){
            throw error;
        }
    }

    static async cerrarSesion(req: ServerRequest): Promise<APIResponse> {
        try{
            let usuario = req.usuarioToken.usuario;
            let _usuario =  await req.query<Usuario>('Usuario').modify('defaultSelect').findOne({usuario});
            let token = generateCode(Defaults.codeAlphabet, Defaults.codeLength);
            await req.query<Usuario>('Usuario').patchAndFetchById(_usuario.idUsuario, {token});
            return new APIResponse(_APIResponse.OK, "Sesion Cerrada Exitosamente");
        }catch(error){
            throw error;
        }
    }

    static async recuperacion(req: ServerRequest, usuario: string): Promise<APIResponse> {
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

    static async restablecer(req: ServerRequest, token: string, usuario: string, nuevaContrasena: string): Promise<APIResponse> {
        try{
            let _usuario =  await req.query<Usuario>('Usuario').modify('authorizationSelect').findOne({usuario});
            if(_usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            if(token==_usuario.token){
                _usuario.token = generateCode(Defaults.codeAlphabet, Defaults.codeLength);
                _usuario.contrasena = await bcrypt.hash(nuevaContrasena, Defaults.saltRounds);   
                await req.query<Usuario>('Usuario').patchAndFetchById(_usuario.idUsuario, _usuario);
                return new APIResponse(_APIResponse.OK, "Recuperacion Exitosamente");
            }else{
                throw new APIResponse(_APIResponse.FORBIDDEN);
            }
        }catch(error){
            throw error;
        }
    }

    static async cambiarContrasena(req: ServerRequest, usuario: string, contrasena: string, nuevaContrasena: string): Promise<APIResponse> {
        try{
            let _usuario =  await req.query<Usuario>('Usuario').modify('authorizationSelect').findOne({usuario});
            if(_usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            if(await bcrypt.compare(contrasena, _usuario.contrasena)){
                _usuario.contrasena = await bcrypt.hash(nuevaContrasena, Defaults.saltRounds);   
                await req.query<Usuario>('Usuario').patchAndFetchById(_usuario.idUsuario, _usuario);
                return new APIResponse(_APIResponse.OK, "Cambio su Contrasena Exitosamente");
            }else{
                throw new APIResponse(_APIResponse.FORBIDDEN);
            }
        }catch(error){
            throw error;
        }
    }

    static async listarUsuarios(req: ServerRequest, nombreCompleto: string, usuario: string, correo: string, celular: string, rol: _Usuario.Rol, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<Coleccion<Usuario>> {
        try{
            let query = req.query<Usuario>('Usuario').modify('defaultSelect');
            query = nombreCompleto ? query.where('nombreCompleto', 'like', `%${nombreCompleto}%`) : query;
            query = usuario ? query.where('usuario', 'like', `%${usuario}%`) : query;
            query = correo ? query.where('correo', 'like', `%${correo}%`) : query;
            query = celular ? query.where('celular', 'like', `%${celular}%`) : query;
            query = rol ? query.where({rol}) : query;
            let usuarios = await query.orderBy(ordenarPor, ordenarModo).page(indicePagina, tamanoPagina);
            let usuariosFormat = usuarios.results.map((item:any) => new Usuario(item).toJSON());
            return new Coleccion<Usuario>(usuariosFormat, usuarios.total);
        }catch(error){
            throw error;
        }
    }

    static async crearUsuario(req: ServerRequest, usuario: Usuario): Promise<APIResponse> {
        try{
            //Verificar que no exista
            if(await req.query<Usuario>('Usuario').findOne({usuario: usuario.usuario})!=null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "El usuario ya existe");
            // Seguridad - Solo un Administrador, puede crear Administradores
            if(req.usuarioToken==null || req.usuarioToken.rol != _Usuario.Rol.ADMINISTRADOR)
                usuario.rol = _Usuario.Rol.USUARIO;

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
            let usuario =  await req.query<Usuario>('Usuario').findById(idUsuario);
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);            
            return usuario.toJSON();
        }catch(error){
            throw error;
        }
    }

    static async actualizarUsuario(req: ServerRequest, idUsuario: number, usuario: Usuario): Promise<APIResponse> {
        try{
            //Verificar que no exista
            if(usuario.usuario!=null && await req.query<Usuario>('Usuario').findOne({usuario: usuario.usuario})!=null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "El usuario ya existe");
            
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
            let usuario =  await req.query<Usuario>('Usuario').findById(idUsuario);
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            if(usuario.archivoFoto==null) throw new APIResponse(_APIResponse.NO_CONTENT, "No hay contenido para mostrar"); 
            return new Response(usuario.archivoFoto as ArrayBuffer, _APIResponse.OK.statusCode, usuario.mimetypeFoto as ContentTypeEnum);
        }catch(error){
            throw error;
        }
    }

    static async cargarUsuarioFoto(req: ServerRequest, idUsuario: number, foto: any): Promise<APIResponse> {
        try {
            let usuario =  await req.query<Usuario>('Usuario').findById(idUsuario);
            //Verificar que Exista
            if(usuario==null) throw new APIResponse(_APIResponse.NOT_FOUND);
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