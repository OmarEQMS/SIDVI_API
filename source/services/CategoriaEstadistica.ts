import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { CategoriaEstadistica, DBModels, _CategoriaEstadistica, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class CategoriaEstadisticaServicio {

    static async listarCategoriaEstadisticas(req: ServerRequest, nombre: string, ordenarPor: string, ordenarModo:OrderModeEnum): Promise<any> {
        try{
            let query = await req.query<CategoriaEstadistica>('CategoriaEstadistica');
        }catch(error){
            throw error;
        }
    }

    static async crearCategoriaEstadistica(req: ServerRequest, categoriaEstadistica: CategoriaEstadistica): Promise<any> {
        try{
            let query = await req.query<CategoriaEstadistica>('CategoriaEstadistica');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerCategoriaEstadistica(req: ServerRequest, idCategoriaEstadistica: number): Promise<any>{
        try{            
            let query = await req.query<CategoriaEstadistica>('CategoriaEstadistica');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarCategoriaEstadistica(req: ServerRequest, idCategoriaEstadistica: number, categoriaEstadistica: CategoriaEstadistica): Promise<any> {
        try{
            let query = await req.query<CategoriaEstadistica>('CategoriaEstadistica');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarCategoriaEstadistica(req: ServerRequest, idCategoriaEstadistica: number): Promise<any> {
        try{
            let query = await req.query<CategoriaEstadistica>('CategoriaEstadistica');   
        }catch(error){
            throw error;
        }
    }

}