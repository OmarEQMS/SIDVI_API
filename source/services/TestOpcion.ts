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

    static async listarTestOpciones(req: ServerRequest, fkTestNodo: number, fkTestNodoSig: number, clave: string, texto: string, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<TestOpcion>('TestOpcion').modify('defaultSelect');
            query = fkTestNodo ? query.where({ fkTestNodo }) : query;
            query = fkTestNodoSig ? query.where({ fkTestNodoSig }) : query;
            query = clave ? query.where('clave', 'like', `%${clave}%`) : query;
            query = texto ? query.where('texto', 'like', `%${texto}%`) : query;
            let testsOpciones = await query.orderBy(ordenarPor, ordenarModo);
            let testsOpcionesFormat = testsOpciones.map((item: any) => new TestOpcion(item).forJSON());
            return new Coleccion<TestOpcion>(testsOpcionesFormat, testsOpcionesFormat.length);
        } catch (error) {
            throw error;
        }
    }

    static async crearTestOpcion(req: ServerRequest, testOpcion: TestOpcion): Promise<any> {
        try {
            deleteProperty(testOpcion, ['idTestOpcion']);
            let newTestOpcion = await req.query<TestOpcion>('TestOpcion').insert(testOpcion);
            return new APIResponse(_APIResponse.CREATED, 'El TestOpcion fue creado satisfactoriamente', { insertedId: newTestOpcion.idTestOpcion });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerTestOpcion(req: ServerRequest, idTestOpcion: number): Promise<any> {
        try {
            let testOpcion = await req.query<TestOpcion>('TestOpcion').findById(idTestOpcion);
            if (testOpcion == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return new TestOpcion(testOpcion).forJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarTestOpcion(req: ServerRequest, idTestOpcion: number, testOpcion: TestOpcion): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<TestOpcion>('TestOpcion').findById(idTestOpcion) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            deleteProperty(testOpcion, ['idTestOpcion']);
            await req.query<TestOpcion>('TestOpcion').patchAndFetchById(idTestOpcion, testOpcion);
            return new APIResponse(_APIResponse.UPDATED, "El TestOpcion fue actualizado");

        } catch (error) {
            throw error;
        }
    }

    static async eliminarTestOpcion(req: ServerRequest, idTestOpcion: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<TestOpcion>('TestOpcion').findById(idTestOpcion) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<TestOpcion>('TestOpcion').deleteById(idTestOpcion);
            return new APIResponse(_APIResponse.DELETED, "El TestOpcion fue eliminado correctamente");

        } catch (error) {
            throw error;
        }
    }

    static async descargarTestOpcionArchivo(req: ServerRequest, idTestOpcion: number): Promise<any> {
        try {
            let testOpcion = await req.query<TestOpcion>('TestOpcion').findById(idTestOpcion);
            if (testOpcion == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            if (testOpcion.archivo == null) throw new APIResponse(_APIResponse.NO_CONTENT, "No hay contenido para mostrar");
            return new Response(testOpcion.archivo as ArrayBuffer, _APIResponse.OK.statusCode, testOpcion.mimetype as ContentTypeEnum);

        } catch (error) {
            throw error;
        }
    }

    static async cargarTestOpcionArchivo(req: ServerRequest, idTestOpcion: number, archivo: any): Promise<any> {
        try {
            let testOpcion = await req.query<TestOpcion>('TestOpcion').findById(idTestOpcion);
            //Verificar que Exista
            if (testOpcion == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Restriction - FileSize - ContentType
            if (archivo.buffer.length > _TestOpcion.archivoFileSize) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite un documento tan grande");
            if (!_TestOpcion.archivoContentType.includes(archivo.mimetype)) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite este formato");

            await req.query<TestOpcion>('TestOpcion').patchAndFetchById(idTestOpcion, { mimetype: archivo.mimetype, archivo: archivo.buffer });
            return new APIResponse(_APIResponse.OK, 'Se ha subido el archivo');
        } catch (error) {
            throw error;
        }
    }

}