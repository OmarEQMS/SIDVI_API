import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { ServerRequest } from '../types';
import { OrderModeEnum, Defaults, ContentTypeEnum } from '../api';
import { Medico, DBModels, _Medico, Coleccion, } from '../models';
import { APIResponse, _APIResponse, Response } from '../responses';
import { Token } from '../models/Token';
import { generateCode, deleteProperty } from '../tools/Utils';
import { Log } from '../tools';

export class MedicoServicio {

    static async listarMedicos(req: ServerRequest, fkUsuario: number, fkUbicacion: number, nombreConsultorio: string, nombreDoctor: string, ordenarPor: string, ordenarModo: OrderModeEnum, tamanoPagina: number, indicePagina: number): Promise<any> {
        try {
            let query = req.query<Medico>('Medico').modify('defaultSelect');
            query = fkUsuario ? query.where('fkUsuario', '=', `%${fkUsuario}%`) : query;
            query = fkUbicacion ? query.where('fkUbicacion', '=', `%${fkUbicacion}%`) : query;
            query = nombreConsultorio ? query.where('nombreConsultorio', 'like', `%${nombreConsultorio}%`) : query;
            query = nombreDoctor ? query.where('nombreDoctor', 'like', `%${nombreDoctor}%`) : query;

            let medicos = await query.orderBy(ordenarPor, ordenarModo).page(indicePagina, tamanoPagina);
            let medicosFormat = medicos.results.map((item: any) => new Medico(item).toJSON());
            return new Coleccion<Medico>(medicosFormat, medicos.total);

        } catch (error) {
            throw error;
        }
    }

    static async crearMedico(req: ServerRequest, medico: Medico): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<Medico>('Medico').findOne({ nombreDoctor: medico.nombreDoctor }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "El Medico ya existe");

            deleteProperty(medico, ['idMedico']);

            let newMedico = await req.query<Medico>('Medico').insert(medico);
            return new APIResponse(_APIResponse.CREATED, 'El Medico fue creada satisfactoriamente', { insertedId: newMedico.idMedico });
        } catch (error) {
            throw error;
        }
    }

    static async obtenerMedico(req: ServerRequest, idMedico: number): Promise<any> {
        try {
            let medico = await req.query<Medico>('Medico').findById(idMedico);
            if (medico == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            return medico.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async actualizarMedico(req: ServerRequest, idMedico: number, medico: Medico): Promise<any> {
        try {
            //Verificar que no exista
            if (await req.query<Medico>('Medico').findOne({ nombreDoctor: medico.nombreDoctor }) != null)
                throw new APIResponse(_APIResponse.UNAVAILABLE, "El Medico ya existe");

            await req.query<Medico>('Medico').patchAndFetchById(idMedico, medico);
            return new APIResponse(_APIResponse.UPDATED, "El Medico fue actualizada");
        } catch (error) {
            throw error;
        }
    }

    static async eliminarMedico(req: ServerRequest, idMedico: number): Promise<any> {
        try {
            //Verificar que Exista
            if (await req.query<Medico>('Medico').findById(idMedico) == null)
                throw new APIResponse(_APIResponse.NOT_FOUND);

            await req.query<Medico>('Medico').deleteById(idMedico);
            return new APIResponse(_APIResponse.DELETED, "El Medico fue eliminada correctamente");
        } catch (error) {
            throw error;
        }
    }

    static async descargarMedicoFoto(req: ServerRequest, idMedico: number): Promise<any> {
        try {
            let usuario = await req.query<Medico>('Medico').findById(idMedico);
            if (usuario == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            if (usuario.archivoFoto == null) throw new APIResponse(_APIResponse.NO_CONTENT, "No hay contenido para mostrar");
            return new Response(usuario.archivoFoto as ArrayBuffer, _APIResponse.OK.statusCode, usuario.mimetypeFoto as ContentTypeEnum);
        } catch (error) {
            throw error;
        }
    }

    static async cargarMedicoFoto(req: ServerRequest, idMedico: number, foto: any): Promise<any> {
        try {
            let medico = await req.query<Medico>('Medico').findById(idMedico);
            //Verificar que Exista
            if (medico == null) throw new APIResponse(_APIResponse.NOT_FOUND);
            //Restriction - FileSize - ContentType
            if (foto.buffer.length > _Medico.archivoFileSize) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite un documento tan grande");
            if (!_Medico.archivoContentType.includes(foto.mimetype)) throw new APIResponse(_APIResponse.UNAVAILABLE, "No se permite este formato");

            await req.query<Medico>('Medico').patchAndFetchById(idMedico, { mimetypeFoto: foto.mimetype, archivoFoto: foto.buffer });
            return new APIResponse(_APIResponse.OK, 'Se ha subido el archivo');
        } catch (error) {
            throw error;
        }
    }

}