import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _CelularEstado {
    
}

export interface ICelularEstado {
    idCelularEstado?: number;
}

export class CelularEstado extends BaseModel implements ICelularEstado {
    // Objection
    static tableName = 'CelularEstado';
    static idColumn = 'idCelularEstado';
    // Objection Modifiers
    static columnList = ['idCelularEstado'];

    // Columns
    idCelularEstado?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(celularEstado?: any){
        super();
        if(celularEstado!==undefined){
            this.idCelularEstado = celularEstado.idCelularEstado;
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
                builder.select(...CelularEstado.columnList);
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
