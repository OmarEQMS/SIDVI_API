import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _CategoriaEstadistica {
    
}

export interface ICategoriaEstadistica {
    idCategoriaEstadistica?: number;
}

export class CategoriaEstadistica extends BaseModel implements ICategoriaEstadistica {
    // Objection
    static tableName = 'CategoriaEstadistica';
    static idColumn = 'idCategoriaEstadistica';
    // Objection Modifiers
    static columnList = ['idCategoriaEstadistica'];

    // Columns
    idCategoriaEstadistica?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(categoriaEstadistica?: any){
        super();
        if(categoriaEstadistica!==undefined){
            this.idCategoriaEstadistica = categoriaEstadistica.idCategoriaEstadistica;
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
                builder.select(...CategoriaEstadistica.columnList);
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
