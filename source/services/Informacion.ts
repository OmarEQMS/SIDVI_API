import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Informacion, DBModels, _Informacion, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class InformacionServicio {

    static async listarInformaciones(req: ServerRequest, fkVirus: number, fkCategoriaInformacion: number, texto: string, ordenarPor: string, ordenarModo:OrderModeEnum): Promise<any> {
        try{
            let query = await req.query<Informacion>('Informacion');   
        }catch(error){
            throw error;
        }
    }

    static async crearInformacion(req: ServerRequest, informacion: Informacion): Promise<any> {
        try{
            let query = await req.query<Informacion>('Informacion');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerInformacion(req: ServerRequest, idInformacion: number): Promise<any>{
        try{            
            let query = await req.query<Informacion>('Informacion');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarInformacion(req: ServerRequest, idInformacion: number, informacion: Informacion): Promise<any> {
        try{
            let query = await req.query<Informacion>('Informacion');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarInformacion(req: ServerRequest, idInformacion: number): Promise<any> {
        try{
            let query = await req.query<Informacion>('Informacion');   
        }catch(error){
            throw error;
        }
    }

    static async descargarInformacionArchivo(req: ServerRequest, idUsuario: number): Promise<any> {
        try{           
            let query = await req.query<Informacion>('Informacion'); 
        }catch(error){
            throw error;
        }
    }

    static async cargarInformacionArchivo(req: ServerRequest, idUsuario: number, archivo: any): Promise<any> {
        try {
            let query = await req.query<Informacion>('Informacion'); 
		} catch (error) {
			throw error;
        }
    }

}