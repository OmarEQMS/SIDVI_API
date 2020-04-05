import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _Medico {
    
}

export interface IMedico {
    idMedico?: number;
}

export class Medico extends BaseModel implements IMedico {
    // Objection
    static tableName = 'Medico';
    static idColumn = 'idMedico';
    // Objection Modifiers
    static columnList = ['idMedico'];

    // Columns
    idMedico?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(medico?: any){
        super();
        if(medico!==undefined){
            this.idMedico = medico.idMedico;
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
                builder.select(...Medico.columnList);
            }
        };
    }

    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation

        //------------------------------------- HasOneRelation
        //------------------------------------- BelongsToOneRelation  

        //------------------------------------- HasOneThroughRelation
    };

}
