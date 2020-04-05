import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _Informacion {
    
}

export interface IInformacion {
    idInformacion?: number;
}

export class Informacion extends BaseModel implements IInformacion {
    // Objection
    static tableName = 'Informacion';
    static idColumn = 'idInformacion';
    // Objection Modifiers
    static columnList = ['idInformacion'];

    // Columns
    idInformacion?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(informacion?: any){
        super();
        if(informacion!==undefined){
            this.idInformacion = informacion.idInformacion;
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
                builder.select(...Informacion.columnList);
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
