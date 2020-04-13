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

    static async listarUbicaciones(req: ServerRequest, fkUbicacion: number, clave: string, nombre: string, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<Ubicacion>('Ubicacion').modify('defaultSelect');
            query = fkUbicacion ? (fkUbicacion==-1 ? query.where({fkUbicacion: null}) : query.where({fkUbicacion}) ) : query;
            query = clave ? query.where('clave', 'like', `%${clave}%`) : query;
            query = nombre ? query.where('nombre', 'like', `%${nombre}%`) : query;
            let ubicaciones = await query.orderBy(ordenarPor, ordenarModo);
            let ubicacionesFormat = ubicaciones.map((item: any) => new Ubicacion(item).forJSON());
            return new Coleccion<Ubicacion>(ubicacionesFormat, ubicacionesFormat.length);
        } catch (error) {
            throw error;
        }
    }

    static async crearUbicacion(req: ServerRequest, ubicacion: Ubicacion): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<Ubicacion>('Ubicacion').findOne({
                nombre: ubicacion.nombre
            }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La ubicacion ya existe");

            deleteProperty(ubicacion, ['idUbicacion']);

            let newUbicacion = await req.query<Ubicacion>('Ubicacion').insert(ubicacion);
            return new APIResponse(_APIResponse.CREATED, 'La ubicacion fue creada satisfactoriamente', { insertedId: newUbicacion.idUbicacion });

        } catch (error) {
            throw error;
        }
    }

    static async obtenerUbicacion(req: ServerRequest, idUbicacion: number): Promise<any> {
        try {
            let ubicacion = await req.query<Ubicacion>('Ubicacion').findById(idUbicacion);
            if (ubicacion == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return new Ubicacion(ubicacion).forJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarUbicacion(req: ServerRequest, idUbicacion: number, ubicacion: Ubicacion): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<Ubicacion>('Ubicacion').findById(idUbicacion) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            deleteProperty(ubicacion, ['idUbicacion']);
            await req.query<Ubicacion>('Ubicacion').patchAndFetchById(idUbicacion, ubicacion);
            return new APIResponse(_APIResponse.UPDATED, "La ubicacion fue actualizada");
        } catch (error) {
            throw error;
        }
    }

    static async eliminarUbicacion(req: ServerRequest, idUbicacion: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<Ubicacion>('Ubicacion').findById(idUbicacion) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<Ubicacion>('Ubicacion').deleteById(idUbicacion);
            return new APIResponse(_APIResponse.DELETED, "La Ubicacion fue eliminada correctamente");

        } catch (error) {
            throw error;
        }
    }

}