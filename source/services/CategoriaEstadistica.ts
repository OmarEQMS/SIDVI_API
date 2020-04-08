import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { CategoriaEstadistica, DBModels, _CategoriaEstadistica, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class CategoriaEstadisticaServicio {

    static async listarCategoriaEstadisticas(req: ServerRequest, nombre: string, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<CategoriaEstadistica>('CategoriaEstadistica').modify('defaultSelect');
            query = nombre ? query.where('nombre', 'like', `%${nombre}%`) : query;

            let categoriasEstadistica = await query.orderBy(ordenarPor, ordenarModo).page(indicePagina, tamanoPagina);
            let categoriasEstadisticaFormat = categoriasEstadistica.results.map((item: any) => new CategoriaEstadistica(item).toJSON());
            return new Coleccion<CategoriaEstadistica>(categoriasEstadisticaFormat, categoriasEstadistica.total);

        } catch (error) {
            throw error;
        }
    }

    static async crearCategoriaEstadistica(req: ServerRequest, categoriaEstadistica: CategoriaEstadistica): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<CategoriaEstadistica>('CategoriaEstadistica').findOne({ nombre: categoriaEstadistica.nombre }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La CategoriaEstadistica ya existe");

            deleteProperty(categoriaEstadistica, ['idCategoriaEstadistica']);

            let newCategoria = await req.query<CategoriaEstadistica>('CategoriaEstadistica').insert(categoriaEstadistica);
            return new APIResponse(_APIResponse.CREATED, 'La CategoriaEstadistica fue creada satisfactoriamente', { insertedId: newCategoria.idCategoriaEstadistica });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerCategoriaEstadistica(req: ServerRequest, idCategoriaEstadistica: number): Promise<any> {
        try {
            let categoriaEstadistica = await req.query<CategoriaEstadistica>('CategoriaEstadistica').findById(idCategoriaEstadistica);
            if (categoriaEstadistica == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return categoriaEstadistica.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarCategoriaEstadistica(req: ServerRequest, idCategoriaEstadistica: number, categoriaEstadistica: CategoriaEstadistica): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<CategoriaEstadistica>('CategoriaEstadistica').findOne({ nombre: categoriaEstadistica.nombre }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La CategoriaEstadistica ya existe");

            await req.query<CategoriaEstadistica>('CategoriaEstadistica').patchAndFetchById(idCategoriaEstadistica, categoriaEstadistica);
            return new APIResponse(_APIResponse.UPDATED, "La CategoriaEstadistica fue actualizada");
        } catch (error) {
            throw error;
        }
    }

    static async eliminarCategoriaEstadistica(req: ServerRequest, idCategoriaEstadistica: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<CategoriaEstadistica>('CategoriaEstadistica').findById(idCategoriaEstadistica) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<CategoriaEstadistica>('CategoriaEstadistica').deleteById(idCategoriaEstadistica);
            return new APIResponse(_APIResponse.DELETED, "La CategoriaEstadistica fue eliminada correctamente");
        } catch (error) {
            throw error;
        }
    }

}