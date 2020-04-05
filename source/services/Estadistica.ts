import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Estadistica, DBModels, _Estadistica, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class EstadisticaServicio {

    static async listarEstadisticas(req: ServerRequest, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<any> {
        try{
            let query = await req.query<Estadistica>('Estadistica');   
        }catch(error){
            throw error;
        }
    }

    static async crearEstadistica(req: ServerRequest, estadistica: Estadistica): Promise<any> {
        try{
            let query = await req.query<Estadistica>('Estadistica');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerEstadistica(req: ServerRequest, idEstadistica: number): Promise<any>{
        try{            
            let query = await req.query<Estadistica>('Estadistica');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarEstadistica(req: ServerRequest, idEstadistica: number, estadistica: Estadistica): Promise<any> {
        try{
            let query = await req.query<Estadistica>('Estadistica');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarEstadistica(req: ServerRequest, idEstadistica: number): Promise<any> {
        try{
            let query = await req.query<Estadistica>('Estadistica');   
        }catch(error){
            throw error;
        }
    }

}