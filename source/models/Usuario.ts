import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { Log } from '../tools';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';

export namespace _Usuario {
    export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.JPG, ContentTypeEnum.PNG];
    export let archivoFileSize: number = 8 * 1024 * 1024;

    export type RolEnum = 'ALUMNO' | 'PROFESOR' | 'ADMINISTRADOR';
    export const RolEnum = {
        ALUMNO: 'ALUMNO' as RolEnum,
        PROFESOR: 'PROFESOR' as RolEnum,
        ADMINISTRADOR: 'ADMINISTRADOR' as RolEnum
    };
    export type EstatusEnum = 'HABILITADO' | 'DESHABILITADO';
    export const EstatusEnum = {
        HABILITADO: 'HABILITADO' as EstatusEnum,
        DESHABILITADO: 'DESHABILITADO' as EstatusEnum,
    };
}

export interface IUsuario {
    idUsuario?: number;
    matricula: string;
    nombreCompleto: string;
    contrasena: string;
    token: string;
    mimetypeFoto?: string;
    archivoFoto?: ArrayBuffer | string;
    rol?: _Usuario.RolEnum;
    correo?: any;
    estatus?: _Usuario.EstatusEnum;
}

export class Usuario extends BaseModel implements IUsuario {
    static tableName = 'Usuario';
    static idColumn = 'idUsuario';
    static columnList = ['idUsuario', 'matricula', 'nombreCompleto', 'mimetypeFoto', 'campus', 'rol', 'correo', 'estatus'];
    static columnListAuthorization = ['idUsuario', 'matricula', 'nombreCompleto', 'contrasena', 'token', 'campus', 'rol', 'estatus'];

    idUsuario?: number;
    matricula: string;
    nombreCompleto: string;
    contrasena: string;
    token: string;
    mimetypeFoto?: ContentTypeEnum;
    archivoFoto?: ArrayBuffer;
    rol?: _Usuario.RolEnum;
    correo?: any;
    estatus?: _Usuario.EstatusEnum;
    // HasMany

    constructor(usuario?: any){
        super();
        if(usuario!==undefined){
            this.idUsuario = usuario.idUsuario;
            this.matricula = usuario.matricula;
            this.nombreCompleto = usuario.nombreCompleto;
            this.contrasena = usuario.contrasena;
            this.mimetypeFoto = usuario.mimetypeFoto
            this.archivoFoto = usuario.archivoFoto;
            this.rol = usuario.rol;
            this.correo = usuario.correo;
            this.estatus = usuario.estatus;
        }
    }
    
    forJSON() {
        delete this.token; //Seguridad - Nunca se envia el parametro contraseña, ni token
        delete this.contrasena;
        delete this.archivoFoto;
        return this;
    }
    
    forBase64() {
        delete this.token;
        delete this.contrasena;
        if (Defaults.allowBase64Types.includes(this.mimetypeFoto)) {
            this.archivoFoto = fileToBase64(this.mimetypeFoto, this.archivoFoto);
        }else{
            delete this.archivoFoto;
        }
        return this;
	}

    static get modifiers() {
        return {   
            defaultSelect(builder) {
                builder.select(...Usuario.columnList);
            },
            authorizationSelect(builder) {
                builder.select(...Usuario.columnListAuthorization);
            }
        };
    }

    static relationMappings: RelationMappings = {
    //------------------------------------- HasManyRelation
        Inscripcion: {
            relation: Model.HasManyRelation,
            modelClass: 'Inscripcion',
            join: { from: 'Usuario.idUsuario', to: 'Inscripcion.fkUsuario' }
        },
        Mensaje: {
            relation: Model.HasManyRelation,
            modelClass: 'Mensaje',
            join: { from: 'Usuario.idUsuario', to: 'Mensaje.fkUsuario' }
        },
        Evento: {
            relation: Model.HasManyRelation,
            modelClass: 'Evento',
            join: { from: 'Usuario.idUsuario', to: 'Evento.fkUsuario' }
        }
    //------------------------------------- HasOneRelation
    //------------------------------------- BelongsToOneRelation  
    //------------------------------------- HasOneThroughRelation
    };

}
