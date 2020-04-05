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

    static async listarUsuarios(req: ServerRequest, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<Coleccion<Usuario>> {
        try{
            let query = req.query<Usuario>('Usuario').modify('defaultSelect');        
            let usuarios = await query.orderBy(ordenarPor, ordenarModo).page(indicePagina, tamanoPagina);
            let usuariosFormat = usuarios.results.map((item:any) => new Usuario(item).toJSON());
            return new Coleccion<Usuario>(usuariosFormat, usuarios.total);
        }catch(error){
            throw error;
        }
    }

    static async crearUsuario(req: ServerRequest, usuario: Usuario): Promise<APIResponse> {
        try{
            deleteProperty(usuario, ['idUsuario']);         
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
            deleteProperty(usuario, ['idUsuario', 'contrasena', 'token']);
            await req.query<Usuario>('Usuario').patchAndFetchById(idUsuario, usuario);
            return new APIResponse(_APIResponse.UPDATED, "El Usuario fue actualizado");
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarUsuario(req: ServerRequest, idUsuario: number): Promise<APIResponse> {
        try{
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
            return new Response<ArrayBuffer>(usuario.archivoFoto as ArrayBuffer, _APIResponse.OK.statusCode, usuario.mimetypeFoto as ContentTypeEnum);
        }catch(error){
            throw error;
        }
    }

    static async cargarUsuarioFoto(req: ServerRequest, idUsuario: number, foto: any): Promise<APIResponse> {
        try {
            await req.query<Usuario>('Usuario').patchAndFetchById(idUsuario, { mimetypeFoto: foto.mimetype, archivoFoto: foto.buffer });
			return new APIResponse(_APIResponse.OK, 'Se ha subido el archivo');
		} catch (error) {
			throw error;
        }
    }

}