import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { SubcategoriaEstadistica, DBModels, _SubcategoriaEstadistica, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class SubcategoriaEstadisticaServicio {

    static async listarSubcategoriaEstadisticas(req: ServerRequest, fkCategoriaEstadistica: number, nombre: string, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').modify('defaultSelect');
            query = fkCategoriaEstadistica ? query.where({fkCategoriaEstadistica}) : query;
            query = nombre ? query.where('nombre', 'like', `%${nombre}%`) : query;

            let categoriasEstadistica = await query.orderBy(ordenarPor, ordenarModo);
            let categoriasEstadisticaFormat = categoriasEstadistica.map((item: any) => new SubcategoriaEstadistica(item).forJSON());
            return new Coleccion<SubcategoriaEstadistica>(categoriasEstadisticaFormat, categoriasEstadistica.length);
        } catch (error) {
            throw error;
        }
    }

    static async crearSubcategoriaEstadistica(req: ServerRequest, subcategoriaEstadistica: SubcategoriaEstadistica): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').findOne({ nombre: subcategoriaEstadistica.nombre }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La SubcategoriaEstadistica ya existe");

            deleteProperty(subcategoriaEstadistica, ['idSubcategoriaEstadistica']);

            let newCategoria = await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').insert(subcategoriaEstadistica);
            return new APIResponse(_APIResponse.CREATED, 'La SubcategoriaEstadistica fue creada satisfactoriamente', { insertedId: newCategoria.idSubcategoriaEstadistica });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerSubcategoriaEstadistica(req: ServerRequest, idSubcategoriaEstadistica: number): Promise<any> {
        try {
            let subcategoriaEstadistica = await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').findById(idSubcategoriaEstadistica);
            if (subcategoriaEstadistica == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return new SubcategoriaEstadistica(subcategoriaEstadistica).forJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarSubcategoriaEstadistica(req: ServerRequest, idSubcategoriaEstadistica: number, subcategoriaEstadistica: SubcategoriaEstadistica): Promise<any> {
        try {
            //Verificar que exista el registro
            if (await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').findById(idSubcategoriaEstadistica) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            //Verificar que no exista el nombre
            if (await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').findOne({ nombre: subcategoriaEstadistica.nombre }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La SubcategoriaEstadistica ya existe");

            await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').patchAndFetchById(idSubcategoriaEstadistica, subcategoriaEstadistica);
            return new APIResponse(_APIResponse.UPDATED, "La SubcategoriaEstadistica fue actualizada");
        } catch (error) {
            throw error;
        }
    }

    static async eliminarSubcategoriaEstadistica(req: ServerRequest, idSubcategoriaEstadistica: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').findById(idSubcategoriaEstadistica) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<SubcategoriaEstadistica>('SubcategoriaEstadistica').deleteById(idSubcategoriaEstadistica);
            return new APIResponse(_APIResponse.DELETED, "La SubcategoriaEstadistica fue eliminada correctamente");
        } catch (error) {
            throw error;
        }
    }

}