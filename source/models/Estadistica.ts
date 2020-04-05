import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _Estadistica {
    
}

export interface IEstadistica {
    idEstadistica?: number;
}

export class Estadistica extends BaseModel implements IEstadistica {
    // Objection
    static tableName = 'Estadistica';
    static idColumn = 'idEstadistica';
    // Objection Modifiers
    static columnList = ['idEstadistica'];

    // Columns
    idEstadistica?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(estadistica?: any){
        super();
        if(estadistica!==undefined){
            this.idEstadistica = estadistica.idEstadistica;
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
                builder.select(...Estadistica.columnList);
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
