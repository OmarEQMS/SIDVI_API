import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Estadistica, DBModels, _Estadistica, Coleccion, SubcategoriaEstadistica, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class EstadisticaServicio {

    static async listarEstadisticas(req: ServerRequest, fkVirus: number, fkUbicacion: number, fkSubcategoriaEstadistica1: number, fkSubcategoriaEstadistica2: number, fkCategoriaEstadistica1: number, fkCategoriaEstadistica2: number, fechaInicio: string, fechaFin: string, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<Estadistica>('Estadistica').modify('defaultSelect');
            query = fkVirus ? query.where({ fkVirus }) : query;
            query = fkUbicacion ? query.where({ fkUbicacion }) : query;

            let subcategoriasIds = new Array(0);
            if (fkSubcategoriaEstadistica1 != null || fkSubcategoriaEstadistica2 != null) {
                subcategoriasIds.push(fkSubcategoriaEstadistica1, fkSubcategoriaEstadistica2);
            }
            if (fkCategoriaEstadistica1 != null) {
                const subcategorias = await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').where({ fkCategoriaEstadistica1 }).modify('defaultSelect');
                let subIds = subcategorias.map((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica);
                subcategoriasIds.push(...subIds);
            }
            if (fkCategoriaEstadistica2 != null) {
                const subcategorias = await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').where({ fkCategoriaEstadistica2 }).modify('defaultSelect');
                let subIds = subcategorias.map((item: SubcategoriaEstadistica) => item.idSubcategoriaEstadistica);
                subcategoriasIds.push(...subIds);
            }

            query = subcategoriasIds.length > 0 ? query.whereIn('fkSubcategoriaEstadistica1', subcategoriasIds) : query;
            query = subcategoriasIds.length > 0 ? query.whereIn('fkSubcategoriaEstadistica2', subcategoriasIds) : query;
            query = fechaInicio ? query.where('fecha', '>', fechaInicio) : query;
            query = fechaFin ? query.where('fecha', '<', fechaFin) : query;

            let estadisticas = await query.orderBy(ordenarPor, ordenarModo);
            let estadisticasFormat = estadisticas.map((item: any) => new Estadistica(item).forJSON());
            return new Coleccion<Estadistica>(estadisticasFormat, estadisticas.length);

        } catch (error) {
            throw error;
        }
    }

    static async crearEstadistica(req: ServerRequest, estadistica: Estadistica): Promise<any> {
        try {
            deleteProperty(estadistica, ['idEstadistica']);

            if (estadistica.fkSubcategoriaEstadistica1 == null && estadistica.fkSubcategoriaEstadistica2 == null) {
                throw new APIResponse(_APIResponse.BAD_REQUEST, 'La estadistica debe pertenecer por lo menos a una categoria');
            } else if (estadistica.fkSubcategoriaEstadistica1 == estadistica.fkSubcategoriaEstadistica2) {
                throw new APIResponse(_APIResponse.BAD_REQUEST, 'La estadistica debe pertenecer por lo menos a una categoria diferente');
            }
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
            return new Estadistica(estadistica).forJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarEstadistica(req: ServerRequest, idEstadistica: number, estadistica: Estadistica): Promise<any> {
        try {
            //Verificar que exista
            if (await req.query<Estadistica>('Estadistica').findById(idEstadistica) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            if (estadistica.fkSubcategoriaEstadistica1 == null && estadistica.fkSubcategoriaEstadistica2 == null) {
                throw new APIResponse(_APIResponse.BAD_REQUEST, 'La estadistica debe pertenecer por lo menos a una categoria');
            } else if (estadistica.fkSubcategoriaEstadistica1 == estadistica.fkSubcategoriaEstadistica2) {
                throw new APIResponse(_APIResponse.BAD_REQUEST, 'La estadistica debe pertenecer por lo menos a una categoria diferente');
            }
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