import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { CelularEstado, DBModels, _CelularEstado, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class CelularEstadoServicio {

    static async listarCelularEstados(req: ServerRequest, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<any> {
        try{
            let query = await req.query<CelularEstado>('CelularEstado');   
        }catch(error){
            throw error;
        }
    }

    static async crearCelularEstado(req: ServerRequest, celularEstado: CelularEstado): Promise<any> {
        try{
            let query = await req.query<CelularEstado>('CelularEstado');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerCelularEstado(req: ServerRequest, idCelularEstado: number): Promise<any>{
        try{            
            let query = await req.query<CelularEstado>('CelularEstado');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarCelularEstado(req: ServerRequest, idCelularEstado: number, celularEstado: CelularEstado): Promise<any> {
        try{
            let query = await req.query<CelularEstado>('CelularEstado');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarCelularEstado(req: ServerRequest, idCelularEstado: number): Promise<any> {
        try{
            let query = await req.query<CelularEstado>('CelularEstado');   
        }catch(error){
            throw error;
        }
    }

}