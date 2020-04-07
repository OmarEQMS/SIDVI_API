import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { CategoriaInformacion, DBModels, _CategoriaInformacion, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class CategoriaInformacionServicio {

    static async listarCategoriasInformaciones(req: ServerRequest, clave: string, nombre: string, ordenarPor: string, ordenarModo:OrderModeEnum): Promise<any> {
        try{
            let query = await req.query<CategoriaInformacion>('CategoriaInformacion');   
        }catch(error){
            throw error;
        }
    }

    static async crearCategoriaInformacion(req: ServerRequest, categoriaInformacion: CategoriaInformacion): Promise<any> {
        try{
            let query = await req.query<CategoriaInformacion>('CategoriaInformacion');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerCategoriaInformacion(req: ServerRequest, idCategoriaInformacion: number): Promise<any>{
        try{            
            let query = await req.query<CategoriaInformacion>('CategoriaInformacion');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarCategoriaInformacion(req: ServerRequest, idCategoriaInformacion: number, categoriaInformacion: CategoriaInformacion): Promise<any> {
        try{
            let query = await req.query<CategoriaInformacion>('CategoriaInformacion');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarCategoriaInformacion(req: ServerRequest, idCategoriaInformacion: number): Promise<any> {
        try{
            let query = await req.query<CategoriaInformacion>('CategoriaInformacion');   
        }catch(error){
            throw error;
        }
    }

}