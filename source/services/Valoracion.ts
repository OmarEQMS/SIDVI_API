import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Valoracion, DBModels, _Valoracion, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class ValoracionServicio {

    static async listarValoraciones(req: ServerRequest, fkMedico: number, fkUsuario: number, ordenarPor: string, ordenarModo:OrderModeEnum): Promise<any> {
        try{
            let query = req.query<Valoracion>('Valoracion').modify('defaultSelect');
            query = fkMedico ? query.where({fkMedico}) : query;
            query = fkUsuario ? query.where({fkUsuario}) : query;
            let valoraciones = await query.orderBy(ordenarPor, ordenarModo);
            let valoracionesFormat = valoraciones.map((item:any) => new Valoracion(item).toJSON());
            return new Coleccion<Valoracion>(valoracionesFormat, valoracionesFormat.length); 
        }catch(error){
            throw error;
        }
    }

    static async crearValoracion(req: ServerRequest, valoracion: Valoracion): Promise<any> {
        try{
            deleteProperty(valoracion, ['idValoracion']);

            let newValoracion = await req.query<Valoracion>('Valoracion').insert(valoracion);
            return new APIResponse(_APIResponse.CREATED, 'La Valoracion fue creada satisfactoriamente', {insertedId: newValoracion.idValoracion});

        }catch(error){
            throw error;
        }
    }

    static async obtenerValoracion(req: ServerRequest, idValoracion: number): Promise<any>{
        try{            
            let valoracion =  await req.query<Valoracion>('Valoracion').findById(idValoracion);
            if(valoracion==null) throw new APIResponse(_APIResponse.NOT_FOUND);       
            return valoracion.toJSON();   
        }catch(error){
            throw error;
        }
    }

    static async actualizarValoracion(req: ServerRequest, idValoracion: number, valoracion: Valoracion): Promise<any> {
        try{
            //Verificar que Exista
            if(await req.query<Valoracion>('Valoracion').findById(idValoracion)==null) 
                throw new APIResponse(_APIResponse.NOT_FOUND);   

            deleteProperty(valoracion, ['idValoracion']);
            await req.query<Valoracion>('Valoracion').patchAndFetchById(idValoracion, valoracion);
            return new APIResponse(_APIResponse.UPDATED, "La valoracion fue actualizada");

        }catch(error){
            throw error;
        }
    }
    
    static async eliminarValoracion(req: ServerRequest, idValoracion: number): Promise<any> {
        try{
            //Verificar que Exista
            if(await req.query<Valoracion>('Valoracion').findById(idValoracion)==null) 
                throw new APIResponse(_APIResponse.NOT_FOUND);   
            
            await req.query<Valoracion>('Valoracion').deleteById(idValoracion);
            return new APIResponse(_APIResponse.DELETED, "La Valoracion fue eliminada correctamente");
   
        }catch(error){
            throw error;
        }
    }

}