import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Usuario} from './Usuario';
import { Ubicacion} from './Ubicacion';
import { MedicoVirus} from './MedicoVirus';
import { Valoracion} from './Valoracion';

export namespace _Medico {
    export let archivoContentType: ContentTypeEnum[] = [ContentTypeEnum.JPG, ContentTypeEnum.PNG];
    export let archivoFileSize: number = 8 * 1024 * 1024;  

    export type Estatus = 'HABILITADO' | 'DESHABILITADO' | 'EN_ESPERA' |'RECHAZADO';
    export const Estatus = {
        HABILITADO: 'HABILITADO' as Estatus,
        DESHABILITADO: 'DESHABILITADO' as Estatus,
        EN_ESPERA: 'EN_ESPERA' as Estatus,
        RECHAZADO: 'RECHAZADO' as Estatus
    };

}

export interface IMedico {
    idMedico?: number;
    fkUsuario?: number;
    fkUbicacion?: number;
    nombreConsultorio?: string;
    nombreDoctor?: string;
    direccionConsultorio?: string;
    telefonoConsultorio?: string;
    cedulaProfesional?: string;
    descripcion?: string;
    mimetypeFoto?: string;
    archivoFoto ?: ArrayBuffer | string; 
    estatus?: _Medico.Estatus;
}   

export class Medico extends BaseModel implements IMedico {
    // Objection
    static tableName = 'Medico';
    static idColumn = 'idMedico';
    // Objection Modifiers
    static columnList = ['idMedico', 'fkUsuario', 'fkUbicacion', 'nombreConsultorio', 'nombreDoctor', 'direccionConsultorio', 'telefonoConsultorio', 'descripcion', 'mimetypeFoto', 'archivoFoto'];

    // Columns
    idMedico?: number;
    fkUsuario?: number;
    fkUbicacion?: number;
    nombreConsultorio?: string;
    nombreDoctor?: string;
    direccionConsultorio?: string;
    telefonoConsultorio?: string;
    cedulaProfesional?: string;
    descripcion?: string;
    mimetypeFoto?: ContentTypeEnum;
    archivoFoto ?: ArrayBuffer | string; 
    estatus?: _Medico.Estatus;

    //Relations: BelongsToOne
    usuario?: Usuario;
    ubicacion?: Ubicacion;
    
    // Relations: HasMany
    medicosVirus?: MedicoVirus[];
    valoraciones?: Valoracion[];
    // Constructor
    constructor(medico?: any){
        super();
        if(medico!==undefined){
            this.idMedico = medico.idMedico;
            this.fkUsuario = medico.fkUsuario;
            this.fkUbicacion = medico.fkUbicacion;
            this.nombreConsultorio = medico.nombreConsultorio;
            this.nombreDoctor = medico.nombreDoctor;
            this.direccionConsultorio = medico.direccionConsultorio;
            this.telefonoConsultorio = medico.telefonoConsultorio;
            this.cedulaProfesional = medico.cedulaProfesional;
            this.descripcion = medico.descripcion;
            this.mimetypeFoto = medico.mimetypeFoto;
            this.archivoFoto = medico.archivoFoto;
            this.estatus = medico.estatus;
        }
    }
    
    // Respond Object
    forJSON() {
        if(this.archivoFoto != null && Defaults.allowBase64Types.includes(this.mimetypeFoto)) {
            this.archivoFoto = fileToBase64(this.mimetypeFoto, this.archivoFoto);
        } else {
            delete this.archivoFoto;
        }
        return this;
    }

    // Objection: Modifiers
    static get modifiers() {
        return {   
            defaultSelect(builder) {
                builder.select(...Medico.columnList);
            }
        };
    }

    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation
        MedicoVirus: {
            relation: Model.HasManyRelation,
            modelClass: 'MedicoVirus',
            join: { from: 'Medico.idMedico', to: 'MedicoVirus.fkMedico' }
        },
        Valoracion: {
            relation: Model.HasManyRelation,
            modelClass: 'Valoracion',
            join: { from: 'Medico.idMedico', to: 'Valoracion.fkMedico' }
        },        
        //------------------------------------- HasOneRelation
        //------------------------------------- BelongsToOneRelation  

        Usuario: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Usuario',
            join: { from: 'Medico.fkUsuario', to: 'Usuario.idUsuario' }
        },
        Ubicacion: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Ubicacion',
            join: { from: 'Medico.fkUbicacion', to: 'Ubicacion.idUbicacion' }
        }

        //------------------------------------- HasOneThroughRelation
    };

}
