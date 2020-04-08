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

    static async listarInformaciones(req: ServerRequest, fkVirus: number, fkCategoriaInformacion: number, texto: string, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<Informacion>('Informacion').modify('defaultSelect');
            query = fkVirus ? query.where('fkVirus', '=', `%${fkVirus}%`) : query;
            query = fkCategoriaInformacion ? query.where('fkCategoriaInformacion', '=', `%${fkCategoriaInformacion}%`) : query;
            query = texto ? query.where('texto', 'like', `%${texto}%`) : query;
            query = query.withGraphFetched('CategoriaInformacion(defaultSelect)');

            let informaciones = await query.orderBy(ordenarPor, ordenarModo);
            let informacionesFormat = informaciones.map((item: any) => new Informacion(item).toJSON());
            return new Coleccion<Informacion>(informacionesFormat, informaciones.length);

        } catch (error) {
            throw error;
        }
    }

    static async crearInformacion(req: ServerRequest, informacion: Informacion): Promise<any> {
        try {
            //Verificar que no exista
            /*if (await req.query<Informacion>('Informacion').findOne({ clave: informacion.clave }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La Informacion ya existe");*/

            deleteProperty(informacion, ['idInformacion']);

            let newInformacion = await req.query<Informacion>('Informacion').insert(informacion);
            return new APIResponse(_APIResponse.CREATED, 'La Informacion fue creada satisfactoriamente', { insertedId: newInformacion.idInformacion });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerInformacion(req: ServerRequest, idInformacion: number): Promise<any> {
        try {
            let informacion = await req.query<Informacion>('Informacion').findById(idInformacion).withGraphFetched('CategoriaInformacion(defaultSelect)');
            if (informacion == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return new Informacion(informacion).toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarInformacion(req: ServerRequest, idInformacion: number, informacion: Informacion): Promise<any> {
        try {
            //Verificar que no exista
            /*if(await req.query<Informacion>('Informacion').findOne({clave: informacion.clave})!=null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La Informacion ya existe");*/

            await req.query<Informacion>('Informacion').patchAndFetchById(idInformacion, informacion);
            return new APIResponse(_APIResponse.UPDATED, "La Informacion fue actualizada");
        } catch (error) {
            throw error;
        }
    }

    static async eliminarInformacion(req: ServerRequest, idInformacion: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<Informacion>('Informacion').findById(idInformacion) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<Informacion>('Informacion').deleteById(idInformacion);
            return new APIResponse(_APIResponse.DELETED, "La Informacion fue eliminada correctamente");
        } catch (error) {
            throw error;
        }
    }

    static async descargarInformacionArchivo(req: ServerRequest, idInformacion: number): Promise<any> {
        try {
            let informacion = await req.query<Informacion>('Informacion').findById(idInformacion);

            //Verificar que exista
            if (informacion == null) throw new APIResponse(_APIResponse.NOT_FOUND);

            //Verificar que tenga un archivo
            if (informacion.archivo == null) throw new APIResponse(_APIResponse.NO_CONTENT, "No hay contenido para mostrar");

            return new Response(informacion.archivo as ArrayBuffer, _APIResponse.OK.statusCode, informacion.mimetype as ContentTypeEnum);
        } catch (error) {
            throw error;
        }
    }

    static async cargarInformacionArchivo(req: ServerRequest, idInformacion: number, archivo: any): Promise<any> {
        try {
            let informacion = await req.query<Informacion>('Informacion').findById(idInformacion);

            //Verificar que exista
            if (informacion == null) throw new APIResponse(_APIResponse.NOT_FOUND);

            //Restriction - FileSize - ContentType
            if (archivo.buffer.length > _Informacion.archivoFileSize) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite un documento tan grande");
            if (!_Informacion.archivoContentType.includes(archivo.mimetype)) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite este formato");

            await req.query<Informacion>('Informacion').patchAndFetchById(idInformacion, { mimetype: archivo.mimetype, archivo: archivo.buffer });
            return new APIResponse(_APIResponse.OK, 'Se ha subido el archivo');
        } catch (error) {
            throw error;
        }
    }

}