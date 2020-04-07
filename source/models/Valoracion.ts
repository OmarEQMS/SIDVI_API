import { RelationMappings, Model, val } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { Medico } from './Medico';
import { Usuario } from './Usuario';

export namespace _Valoracion {
    
}

export interface IValoracion {
    idValoracion?: number;
    fkMedico?: number;
    fkUsuario?: number;
    valoracion?: number;
}

export class Valoracion extends BaseModel implements IValoracion {
    // Objection
    static tableName = 'Valoracion';
    static idColumn = 'idValoracion';
    // Objection Modifiers
    static columnList = ['idValoracion'];

    // Columns
    idValoracion?: number;
    fkMedico?: number;
    fkUsuario?: number;
    valoracion?: number;

    //Relations: BelongsToOne
    medico?: Medico;
    usuario?: Usuario;

    // Relations: HasMany

    // Constructor
    constructor(valoracion?: any){
        super();
        if(valoracion!==undefined){
            this.idValoracion = valoracion.idValoracion;
            this.fkMedico = valoracion.fkMedico;
            this.fkUsuario = valoracion.fkUsuario;
            this.valoracion = valoracion.valoracion;
        }
    }
    
    // Respond Object
    toJSON() {
        return this;
    }

    // Objection: Modifiers
    static get modifiers() {
        return {   
            defaultSelect(builder) {
                builder.select(...Valoracion.columnList);
            }
        };
    }


    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation

        //------------------------------------- HasOneRelation
        //------------------------------------- BelongsToOneRelation  
        Medico: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Medico',
            join: { from: 'Valoracion.fkMedico', to: 'Medico.idMedico' }
        },
        Usuario: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Usuario',
            join: { from: 'Valoracion.fkUsuario', to: 'Usuario.idUsuario' }
        }

        //------------------------------------- HasOneThroughRelation
    };

}
