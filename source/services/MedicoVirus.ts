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
            let query = await req.query<MedicoVirus>('MedicoVirus');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerMedicoVirus(req: ServerRequest, idMedicoVirus: number): Promise<any>{
        try{            
            let query = await req.query<MedicoVirus>('MedicoVirus');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarMedicoVirus(req: ServerRequest, idMedicoVirus: number, medicoVirus: MedicoVirus): Promise<any> {
        try{
            let query = await req.query<MedicoVirus>('MedicoVirus');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarMedicoVirus(req: ServerRequest, idMedicoVirus: number): Promise<any> {
        try{
            let query = await req.query<MedicoVirus>('MedicoVirus');   
        }catch(error){
            throw error;
        }
    }

}