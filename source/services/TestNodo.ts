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

    static async listarTestNodos(req: ServerRequest, fkVirus: number, texto: string, ordenarPor: string, ordenarModo:OrderModeEnum): Promise<any> {
        try{
            let query = req.query<TestNodo>('TestNodo').modify('defaultSelect');
            query = fkVirus ? query.where({fkVirus}) : query;
            query = texto ? query.where('texto', 'like', `%${texto}%`) : query;
            let testsNodos = await query.orderBy(ordenarPor, ordenarModo);
            let testsNodosFormat = testsNodos.map((item:any) => new TestNodo(item).toJSON());
            return new Coleccion<TestNodo>(testsNodosFormat, testsNodosFormat.length);
        }catch(error){
            throw error;
        }
    }

    static async crearTestNodo(req: ServerRequest, testNodo: TestNodo): Promise<any> {
        try{

            deleteProperty(testNodo,['idTestNodo']);
            let newTestNodo = await req.query<TestNodo>('TestNodo').insert(testNodo);
            return new APIResponse(_APIResponse.CREATED, 'El testNodo fue creado satisfactoriamente', {insertedId: newTestNodo.idTestNodo}); 
        }catch(error){
            throw error;
        }
    }

    static async obtenerTestNodo(req: ServerRequest, idTestNodo: number): Promise<any>{
        try{            
            let testNodo =  await req.query<TestNodo>('TestNodo').findById(idTestNodo);
            if(testNodo==null) throw new APIResponse(_APIResponse.NOT_FOUND);       
            return testNodo.toJSON();    
        }catch(error){
            throw error;
        }
    }

    static async actualizarTestNodo(req: ServerRequest, idTestNodo: number, testNodo: TestNodo): Promise<any> {
        try{
            //Verificar que Exista
            if(await req.query<TestNodo>('TestNodo').findById(idTestNodo)==null) 
                throw new APIResponse(_APIResponse.NOT_FOUND);   

            deleteProperty(testNodo, ['idTestNodo']);
            await req.query<TestNodo>('TestNodo').patchAndFetchById(idTestNodo, testNodo);
            return new APIResponse(_APIResponse.UPDATED, "El testNodo fue actualizado");     
        }catch(error){
            throw error;
        }
    }
    
    static async eliminarTestNodo(req: ServerRequest, idTestNodo: number): Promise<any> {
        try{
            //Verificar que Exista
            if(await req.query<TestNodo>('TestNodo').findById(idTestNodo)==null) 
                throw new APIResponse(_APIResponse.NOT_FOUND);   
            
            await req.query<TestNodo>('TestNodo').deleteById(idTestNodo);
            return new APIResponse(_APIResponse.DELETED, "El TestNodo fue eliminado correctamente");

        }catch(error){
            throw error;
        }
    }

    static async descargarTestNodoArchivo(req: ServerRequest, idTestNodo: number): Promise<any> {
        try{           
            let testNodo =  await req.query<TestNodo>('TestNodo').findById(idTestNodo);
            if(testNodo==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            if(testNodo.archivo==null) throw new APIResponse(_APIResponse.NO_CONTENT, "No hay contenido para mostrar"); 
            return new Response(testNodo.archivo as ArrayBuffer, _APIResponse.OK.statusCode, testNodo.mimetype as ContentTypeEnum);

        }catch(error){
            throw error;
        }
    }

    static async cargarTestNodoArchivo(req: ServerRequest, idTestNodo: number, archivo: any): Promise<any> {
        try {
            let testNodo =  await req.query<TestNodo>('TestNodo').findById(idTestNodo);
            //Verificar que Exista
            if(testNodo==null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Restriction - FileSize - ContentType
            if(archivo.buffer.length>_TestNodo.archivoFileSize) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite un documento tan grande");
            if(!_TestNodo.archivoContentType.includes(archivo.mimetype)) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite este formato");

            await req.query<TestNodo>('TestNodo').patchAndFetchById(idTestNodo, { mimetype: archivo.mimetype, archivo: archivo.buffer });
			return new APIResponse(_APIResponse.OK, 'Se ha subido el archivo');
		} catch (error) {
			throw error;
        }
    }

}