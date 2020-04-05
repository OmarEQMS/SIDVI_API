import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Medico, DBModels, _Medico, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class MedicoServicio {

    static async listarMedicos(req: ServerRequest, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<any> {
        try{
            let query = await req.query<Medico>('Medico');   
        }catch(error){
            throw error;
        }
    }

    static async crearMedico(req: ServerRequest, medico: Medico): Promise<any> {
        try{
            let query = await req.query<Medico>('Medico');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerMedico(req: ServerRequest, idMedico: number): Promise<any>{
        try{            
            let query = await req.query<Medico>('Medico');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarMedico(req: ServerRequest, idMedico: number, medico: Medico): Promise<any> {
        try{
            let query = await req.query<Medico>('Medico');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarMedico(req: ServerRequest, idMedico: number): Promise<any> {
        try{
            let query = await req.query<Medico>('Medico');   
        }catch(error){
            throw error;
        }
    }

    static async descargarMedicoFoto(req: ServerRequest, idUsuario: number): Promise<any> {
        try{           
            let query = await req.query<Medico>('Medico'); 
        }catch(error){
            throw error;
        }
    }

    static async cargarMedicoFoto(req: ServerRequest, idUsuario: number, foto: any): Promise<any> {
        try {
            let query = await req.query<Medico>('Medico'); 
		} catch (error) {
			throw error;
        }
    }

}