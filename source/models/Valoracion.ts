import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _Valoracion {
    
}

export interface IValoracion {
    idValoracion?: number;
}

export class Valoracion extends BaseModel implements IValoracion {
    // Objection
    static tableName = 'Valoracion';
    static idColumn = 'idValoracion';
    // Objection Modifiers
    static columnList = ['idValoracion'];

    // Columns
    idValoracion?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(valoracion?: any){
        super();
        if(valoracion!==undefined){
            this.idValoracion = valoracion.idValoracion;
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

        //------------------------------------- HasOneThroughRelation
    };

}
