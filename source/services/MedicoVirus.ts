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

    static async listarMedicosVirus(req: ServerRequest, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<any> {
        try{
            let query = await req.query<MedicoVirus>('MedicoVirus');   
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