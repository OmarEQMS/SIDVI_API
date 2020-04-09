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

    static async listarEstadisticas(req: ServerRequest, fkVirus: number, fkUbicacion: number, fkCategoriaEstadistica: number, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<Estadistica>('Estadistica').modify('defaultSelect');
            query = fkVirus ? query.where({fkVirus}) : query;
            query = fkUbicacion ? query.where({fkUbicacion}) : query;
            query = fkCategoriaEstadistica ? query.where({fkCategoriaEstadistica}) : query;
            query = query.withGraphFetched('CategoriaEstadistica(defaultSelect)');

            let estadisticas = await query.orderBy(ordenarPor, ordenarModo);
            let estadisticasFormat = estadisticas.map((item: any) => new Estadistica(item).toJSON());
            return new Coleccion<Estadistica>(estadisticasFormat, estadisticas.length);

        } catch (error) {
            throw error;
        }
    }

    static async crearEstadistica(req: ServerRequest, estadistica: Estadistica): Promise<any> {
        try {
            //Verificar que no exista
            /*if (await req.query<Estadistica>('Estadistica').findOne({ clave: estadistica.clave }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La Estadistica ya existe");*/

            deleteProperty(estadistica, ['idEstadistica']);

            let newEstadistica = await req.query<Estadistica>('Estadistica').insert(estadistica);
            return new APIResponse(_APIResponse.CREATED, 'La Estadistica fue creada satisfactoriamente', { insertedId: newEstadistica.idEstadistica });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerEstadistica(req: ServerRequest, idEstadistica: number): Promise<any> {
        try {
            let estadistica = await req.query<Estadistica>('Estadistica').findById(idEstadistica).withGraphFetched('CategoriaEstadistica(defaultSelect)');
            if (estadistica == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return new Estadistica(estadistica).toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarEstadistica(req: ServerRequest, idEstadistica: number, estadistica: Estadistica): Promise<any> {
        try {
            //Verificar que no exista
            /*if(await req.query<Estadistica>('Estadistica').findOne({clave: estadistica.clave})!=null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La Estadistica ya existe");*/

            await req.query<Estadistica>('Estadistica').patchAndFetchById(idEstadistica, estadistica);
            return new APIResponse(_APIResponse.UPDATED, "La Estadistica fue actualizada");
        } catch (error) {
            throw error;
        }
    }

    static async eliminarEstadistica(req: ServerRequest, idEstadistica: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<Estadistica>('Estadistica').findById(idEstadistica) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<Estadistica>('Estadistica').deleteById(idEstadistica);
            return new APIResponse(_APIResponse.DELETED, "La Estadistica fue eliminada correctamente");
        } catch (error) {
            throw error;
        }
    }

}