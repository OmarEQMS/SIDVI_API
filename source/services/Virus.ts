import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Virus, DBModels, _Virus, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class VirusServicio {

    static async listarVirus(req: ServerRequest, clave: string, nombre: string, fkTestNodo: number, estatus: _Virus.Estatus, ordenarPor: string, ordenarModo:OrderModeEnum): Promise<any> {
        try{
            let query = req.query<Virus>('Virus').modify('defaultSelect');
            query = clave ? query.where('clave', 'like', `%${clave}%`) : query;
            query = nombre ? query.where('nombre', 'like', `%${nombre}%`) : query;
            query = fkTestNodo ? query.where({fkTestNodo}) : query;
            query = estatus ? query.where({estatus}) : query;
            let virus = await query.orderBy(ordenarPor, ordenarModo);
            let virusFormat = virus.map((item:any) => new Virus(item).toJSON());
            return new Coleccion<Virus>(virusFormat, virusFormat.length);

        }catch(error){
            throw error;
        }
    }

    static async crearVirus(req: ServerRequest, virus: Virus): Promise<any> {
        try{
            //Verificar que no exista
            if(await req.query<Virus>('Virus').findOne({
                nombre: virus.nombre
            })!=null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "El virus ya existe");

            deleteProperty(virus, ['idVirus']);

            let newVirus = await req.query<Virus>('Virus').insert(virus);
            return new APIResponse(_APIResponse.CREATED, 'El virus fue creado satisfactoriamente', {insertedId: newVirus.idVirus});

        }catch(error){
            throw error;
        }
    }

    static async obtenerVirus(req: ServerRequest, idVirus: number): Promise<any>{
        try{            
            let virus =  await req.query<Virus>('Virus').findById(idVirus);
            if(virus==null) throw new APIResponse(_APIResponse.NOT_FOUND);       
            return virus.toJSON();

        }catch(error){
            throw error;
        }
    }

    static async actualizarVirus(req: ServerRequest, idVirus: number, virus: Virus): Promise<any> {
        try{
            //Verificar que Exista
            if(await req.query<Virus>('Virus').findById(idVirus)==null) 
                throw new APIResponse(_APIResponse.NOT_FOUND);   

            deleteProperty(virus, ['idVirus']);
            await req.query<Virus>('Virus').patchAndFetchById(idVirus, virus);
            return new APIResponse(_APIResponse.UPDATED, "El virus fue actualizado");   

        }catch(error){
            throw error;
        }
    }
    
    static async eliminarVirus(req: ServerRequest, idVirus: number): Promise<any> {
        try{
            if(await req.query<Virus>('Virus').findById(idVirus)==null) 
            throw new APIResponse(_APIResponse.NOT_FOUND);   
        
            await req.query<Virus>('Virus').deleteById(idVirus);
            return new APIResponse(_APIResponse.DELETED, "El virus fue eliminado correctamente");

        }catch(error){
            throw error;
        }
    }

    static async descargarVirusIcono(req: ServerRequest, idVirus: number): Promise<any> {
        try{           
            let virus =  await req.query<Virus>('Virus').findById(idVirus);
            if(virus==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            if(virus.archivoIcono==null) throw new APIResponse(_APIResponse.NO_CONTENT, "No hay contenido para mostrar"); 
            return new Response(virus.archivoIcono as ArrayBuffer, _APIResponse.OK.statusCode, virus.mimetypeIcono as ContentTypeEnum);

        }catch(error){
            throw error;
        }
    }

    static async cargarVirusIcono(req: ServerRequest, idVirus: number, icono: any): Promise<any> {
        try {
            let virus =  await req.query<Virus>('Virus').findById(idVirus);
            //Verificar que Exista
            if(virus==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Restriction - FileSize - ContentType
            if(icono.buffer.length>_Virus.archivoFileSize) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite un documento tan grande");
            if(!_Virus.archivoContentType.includes(icono.mimetype)) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite este formato");

            await req.query<Virus>('Virus').patchAndFetchById(idVirus, { mimetypeIcono: icono.mimetype, archivoIcono: icono.buffer });
            return new APIResponse(_APIResponse.OK, 'Se ha subido el archivo');
            
		} catch (error) {
			throw error;
        }
    }

}