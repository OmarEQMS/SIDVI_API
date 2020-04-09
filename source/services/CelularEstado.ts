import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { CelularEstado, DBModels, _CelularEstado, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class CelularEstadoServicio {

    static async listarCelularEstados(req: ServerRequest, celular: string, fkVirus: number, seccion: _CelularEstado.Seccion, ordenarPor: string, ordenarModo: OrderModeEnum): Promise<any> {
        try {
            let query = req.query<CelularEstado>('CelularEstado').modify('defaultSelect');
            query = celular ? query.where('celular', 'like', `%${celular}%`) : query;
            query = fkVirus ? query.where({fkVirus}) : query;
            query = seccion ? query.where('seccion', 'like', `%${seccion}%`) : query;

            let celularesEstado = await query.orderBy(ordenarPor, ordenarModo);
            let celularesEstadoFormat = celularesEstado.map((item: any) => new CelularEstado(item).toJSON());
            return new Coleccion<CelularEstado>(celularesEstadoFormat, celularesEstado.length);

        } catch (error) {
            throw error;
        }
    }

    static async crearCelularEstado(req: ServerRequest, celularEstado: CelularEstado): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<CelularEstado>('CelularEstado').findOne({ celular: celularEstado.celular }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "El CelularEstado ya existe");

            deleteProperty(celularEstado, ['idCelularEstado']);

            let newCelularEstado = await req.query<CelularEstado>('CelularEstado').insert(celularEstado);
            return new APIResponse(_APIResponse.CREATED, 'El CelularEstado fue creado satisfactoriamente', { insertedId: newCelularEstado.idCelularEstado });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerCelularEstado(req: ServerRequest, idCelularEstado: number): Promise<any> {
        try {
            let celularEstado = await req.query<CelularEstado>('CelularEstado').findById(idCelularEstado);
            if (celularEstado == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return new CelularEstado(celularEstado).toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarCelularEstado(req: ServerRequest, idCelularEstado: number, celularEstado: CelularEstado): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<CelularEstado>('CelularEstado').findOne({ celular: celularEstado.celular }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "El CelularEstado ya existe");

            await req.query<CelularEstado>('CelularEstado').patchAndFetchById(idCelularEstado, celularEstado);
            return new APIResponse(_APIResponse.UPDATED, "El CelularEstado fue actualizado");
        } catch (error) {
            throw error;
        }
    }

    static async eliminarCelularEstado(req: ServerRequest, idCelularEstado: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<CelularEstado>('CelularEstado').findById(idCelularEstado) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<CelularEstado>('CelularEstado').deleteById(idCelularEstado);
            return new APIResponse(_APIResponse.DELETED, "El CelularEstado fue eliminado correctamente");
        } catch (error) {
            throw error;
        }
    }

}