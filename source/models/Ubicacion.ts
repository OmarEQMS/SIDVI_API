import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _Ubicacion {
    
}

export interface IUbicacion {
    idUbicacion?: number;
}

export class Ubicacion extends BaseModel implements IUbicacion {
    // Objection
    static tableName = 'Ubicacion';
    static idColumn = 'idUbicacion';
    // Objection Modifiers
    static columnList = ['idUbicacion'];

    // Columns
    idUbicacion?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(ubicacion?: any){
        super();
        if(ubicacion!==undefined){
            this.idUbicacion = ubicacion.idUbicacion;
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
                builder.select(...Ubicacion.columnList);
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
