import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Virus, DBModels, _Virus, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class VirusServicio {

    static async listarVirus(req: ServerRequest, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<any> {
        try{
            let query = await req.query<Virus>('Virus');   
        }catch(error){
            throw error;
        }
    }

    static async crearVirus(req: ServerRequest, virus: Virus): Promise<any> {
        try{
            let query = await req.query<Virus>('Virus');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerVirus(req: ServerRequest, idVirus: number): Promise<any>{
        try{            
            let query = await req.query<Virus>('Virus');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarVirus(req: ServerRequest, idVirus: number, virus: Virus): Promise<any> {
        try{
            let query = await req.query<Virus>('Virus');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarVirus(req: ServerRequest, idVirus: number): Promise<any> {
        try{
            let query = await req.query<Virus>('Virus');   
        }catch(error){
            throw error;
        }
    }

    static async descargarVirusIcono(req: ServerRequest, idUsuario: number): Promise<any> {
        try{           
            let query = await req.query<Virus>('Virus'); 
        }catch(error){
            throw error;
        }
    }

    static async cargarVirusIcono(req: ServerRequest, idUsuario: number, icono: any): Promise<any> {
        try {
            let query = await req.query<Virus>('Virus'); 
		} catch (error) {
			throw error;
        }
    }

}