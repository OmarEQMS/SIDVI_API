import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { TestNodo, DBModels, _TestNodo, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class TestNodoServicio {

    static async listarTestNodos(req: ServerRequest, ordenarPor: string, ordenarModo:OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<any> {
        try{
            let query = await req.query<TestNodo>('TestNodo');   
        }catch(error){
            throw error;
        }
    }

    static async crearTestNodo(req: ServerRequest, testNodo: TestNodo): Promise<any> {
        try{
            let query = await req.query<TestNodo>('TestNodo');   
        }catch(error){
            throw error;
        }
    }

    static async obtenerTestNodo(req: ServerRequest, idTestNodo: number): Promise<any>{
        try{            
            let query = await req.query<TestNodo>('TestNodo');   
        }catch(error){
            throw error;
        }
    }

    static async actualizarTestNodo(req: ServerRequest, idTestNodo: number, testNodo: TestNodo): Promise<any> {
        try{
            let query = await req.query<TestNodo>('TestNodo');   
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarTestNodo(req: ServerRequest, idTestNodo: number): Promise<any> {
        try{
            let query = await req.query<TestNodo>('TestNodo');   
        }catch(error){
            throw error;
        }
    }

    static async descargarTestNodoArchivo(req: ServerRequest, idUsuario: number): Promise<any> {
        try{           
            let query = await req.query<TestNodo>('TestNodo'); 
        }catch(error){
            throw error;
        }
    }

    static async cargarTestNodoArchivo(req: ServerRequest, idUsuario: number, archivo: any): Promise<any> {
        try {
            let query = await req.query<TestNodo>('TestNodo'); 
		} catch (error) {
			throw error;
        }
    }

}