import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { CategoriaInformacion, DBModels, _CategoriaInformacion, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class CategoriaInformacionServicio {

    static async listarCategoriasInformaciones(req: ServerRequest, clave: string, nombre: string, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<CategoriaInformacion>('CategoriaInformacion').modify('defaultSelect');
            query = clave ? query.where('clave', 'like', `%${clave}%`) : query;
            query = nombre ? query.where('nombre', 'like', `%${nombre}%`) : query;

            let categoriasInformacion = await query.orderBy(ordenarPor, ordenarModo);
            let categoriasInformacionFormat = categoriasInformacion.map((item: any) => new CategoriaInformacion(item).forJSON());
            return new Coleccion<CategoriaInformacion>(categoriasInformacionFormat, categoriasInformacion.length);
        } catch (error) {
            throw error;
        }
    }

    static async crearCategoriaInformacion(req: ServerRequest, categoriaInformacion: CategoriaInformacion): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<CategoriaInformacion>('CategoriaInformacion').findOne({ clave: categoriaInformacion.clave }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La CategoriaInformacion ya existe");

            deleteProperty(categoriaInformacion, ['idCategoriaInformacion']);

            let newCategoriaInformacion = await req.query<CategoriaInformacion>('CategoriaInformacion').insert(categoriaInformacion);
            return new APIResponse(_APIResponse.CREATED, 'La CategoriaEstadistica fue creada satisfactoriamente', { insertedId: newCategoriaInformacion.idCategoriaInformacion });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerCategoriaInformacion(req: ServerRequest, idCategoriaInformacion: number): Promise<any> {
        try {
            let categoriaInformacion = await req.query<CategoriaInformacion>('CategoriaInformacion').findById(idCategoriaInformacion);
            if (categoriaInformacion == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return new CategoriaInformacion(categoriaInformacion).forJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarCategoriaInformacion(req: ServerRequest, idCategoriaInformacion: number, categoriaInformacion: CategoriaInformacion): Promise<any> {
        try {
            //Verificar que exista el registro
            if (await req.query<CategoriaInformacion>('CategoriaInformacion').findById(idCategoriaInformacion) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            //Verificar que no exista la clave
            let categoriaInfo= await req.query<CategoriaInformacion>('CategoriaInformacion').findOne({ clave: categoriaInformacion.clave});
            if (categoriaInfo != null && categoriaInfo.idCategoriaInformacion!=idCategoriaInformacion)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "La CategoriaInformacion ya existe");

            await req.query<CategoriaInformacion>('CategoriaInformacion').patchAndFetchById(idCategoriaInformacion, categoriaInformacion);
            return new APIResponse(_APIResponse.UPDATED, "La CategoriaEstadistica fue actualizada");
        } catch (error) {
            throw error;
        }
    }

    static async eliminarCategoriaInformacion(req: ServerRequest, idCategoriaInformacion: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<CategoriaInformacion>('CategoriaInformacion').findById(idCategoriaInformacion) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<CategoriaInformacion>('CategoriaInformacion').deleteById(idCategoriaInformacion);
            return new APIResponse(_APIResponse.DELETED, "La CategoriaInformacion fue eliminada correctamente");
        } catch (error) {
            throw error;
        }
    }

}