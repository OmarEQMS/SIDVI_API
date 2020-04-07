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
            let query = await req.query<Valoracion>('Valoracion');   
        }catch(error){
            throw error;
        }
    }

    static async crearValoracion(req: ServerRequest, valoracion: Valoracion): Promise<any> {
        try{
            let query = await req.query<Valoracion>('Valoracion');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerValoracion(req: ServerRequest, idValoracion: number): Promise<any>{
        try{            
            let query = await req.query<Valoracion>('Valoracion');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarValoracion(req: ServerRequest, idValoracion: number, valoracion: Valoracion): Promise<any> {
        try{
            let query = await req.query<Valoracion>('Valoracion');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarValoracion(req: ServerRequest, idValoracion: number): Promise<any> {
        try{
            let query = await req.query<Valoracion>('Valoracion');   
        }catch(error){
            throw error;
        }
    }

}