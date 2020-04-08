import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { MedicoVirus, DBModels, _MedicoVirus, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class MedicoVirusServicio {

    static async listarMedicosVirus(req: ServerRequest, fkMedico: number, fkVirus: number, ordenarPor: string, ordenarModo:OrderModeEnum): Promise<Coleccion<MedicoVirus>> {
        try{
            let query = req.query<MedicoVirus>('MedicoVirus').modify('defaultSelect');
            query = fkMedico ? query.where({fkMedico}) : query;
            query = fkVirus ? query.where({fkVirus}) : query;
            let medicosVirus = await query.orderBy(ordenarPor, ordenarModo);
            let medicosVirusFormat = medicosVirus.map((item:any) => new MedicoVirus(item).toJSON());
            return new Coleccion<MedicoVirus>(medicosVirusFormat, medicosVirusFormat.length);
        }catch(error){
            throw error;
        }
    }

    static async crearMedicoVirus(req: ServerRequest, medicoVirus: MedicoVirus): Promise<any> {
        try{
            //Verificar que no exista
            if(await req.query<MedicoVirus>('MedicoVirus').findOne({
                fkMedico: medicoVirus.fkMedico,
                fkVirus: medicoVirus.fkVirus
            })!=null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "El MedicoVirus ya existe");

            deleteProperty(medicoVirus, ['IdMedicoVirus']);

            let newMedicoVirus = await req.query<MedicoVirus>('MedicoVirus').insert(medicoVirus);
            return new APIResponse(_APIResponse.CREATED, 'El medicoVirus fue creado satisfactoriamente', {insertedId: newMedicoVirus.idMedicoVirus});
        }catch(error){
            throw error;
        }
    }

    static async obtenerMedicoVirus(req: ServerRequest, idMedicoVirus: number): Promise<any>{
        try{            
            let medicoVirus =  await req.query<MedicoVirus>('MedicoVirus').findById(idMedicoVirus);
            if(medicoVirus==null) throw new APIResponse(_APIResponse.NOT_FOUND);       
            return medicoVirus.toJSON();  
        }catch(error){
            throw error;
        }
    }

    static async actualizarMedicoVirus(req: ServerRequest, idMedicoVirus: number, medicoVirus: MedicoVirus): Promise<any> {
        try{
            //Verificar que Exista
            if(await req.query<MedicoVirus>('MedicoVirus').findById(idMedicoVirus)==null) 
                throw new APIResponse(_APIResponse.NOT_FOUND);   

            deleteProperty(medicoVirus, ['IdMedicoVirus']);
            await req.query<MedicoVirus>('MedicoVirus').patchAndFetchById(idMedicoVirus, medicoVirus);
            return new APIResponse(_APIResponse.UPDATED, "El medicoVirus fue actualizado");        
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarMedicoVirus(req: ServerRequest, idMedicoVirus: number): Promise<any> {
        try{
            //Verificar que Exista
            if(await req.query<MedicoVirus>('MedicoVirus').findById(idMedicoVirus)==null) 
                throw new APIResponse(_APIResponse.NOT_FOUND);   
            
            await req.query<MedicoVirus>('MedicoVirus').deleteById(idMedicoVirus);
            return new APIResponse(_APIResponse.DELETED, "El MedicoVirus fue eliminado correctamente");
        }catch(error){
            throw error;
        }
    }

}