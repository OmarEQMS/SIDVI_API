import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { TestOpcion, DBModels, _TestOpcion, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class TestOpcionServicio {

    static async listarTestOpciones(req: ServerRequest, fkTestNodo: number, fkTestNodoSig: number, clave: string, texto: string, ordenarPor: string, ordenarModo:OrderModeEnum): Promise<any> {
        try{
            let query = await req.query<TestOpcion>('TestOpcion');   
        }catch(error){
            throw error;
        }
    }

    static async crearTestOpcion(req: ServerRequest, testOpcion: TestOpcion): Promise<any> {
        try{
            let query = await req.query<TestOpcion>('TestOpcion');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerTestOpcion(req: ServerRequest, idTestOpcion: number): Promise<any>{
        try{            
            let query = await req.query<TestOpcion>('TestOpcion');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarTestOpcion(req: ServerRequest, idTestOpcion: number, testOpcion: TestOpcion): Promise<any> {
        try{
            let query = await req.query<TestOpcion>('TestOpcion');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarTestOpcion(req: ServerRequest, idTestOpcion: number): Promise<any> {
        try{
            let query = await req.query<TestOpcion>('TestOpcion');   
        }catch(error){
            throw error;
        }
    }

    static async descargarTestOpcionArchivo(req: ServerRequest, idUsuario: number): Promise<any> {
        try{           
            let query = await req.query<TestOpcion>('TestOpcion'); 
        }catch(error){
            throw error;
        }
    }

    static async cargarTestOpcionArchivo(req: ServerRequest, idUsuario: number, archivo: any): Promise<any> {
        try {
            let query = await req.query<TestOpcion>('TestOpcion'); 
		} catch (error) {
			throw error;
        }
    }

}