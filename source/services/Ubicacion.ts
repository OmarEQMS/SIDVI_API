import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Ubicacion, DBModels, _Ubicacion, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class UbicacionServicio {

    static async listarUbicaciones(req: ServerRequest, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<any> {
        try{
            let query = await req.query<Ubicacion>('Ubicacion');   
        }catch(error){
            throw error;
        }
    }

    static async crearUbicacion(req: ServerRequest, ubicacion: Ubicacion): Promise<any> {
        try{
            let query = await req.query<Ubicacion>('Ubicacion');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerUbicacion(req: ServerRequest, idUbicacion: number): Promise<any>{
        try{            
            let query = await req.query<Ubicacion>('Ubicacion');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarUbicacion(req: ServerRequest, idUbicacion: number, ubicacion: Ubicacion): Promise<any> {
        try{
            let query = await req.query<Ubicacion>('Ubicacion');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarUbicacion(req: ServerRequest, idUbicacion: number): Promise<any> {
        try{
            let query = await req.query<Ubicacion>('Ubicacion');   
        }catch(error){
            throw error;
        }
    }

}