import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _CategoriaInformacion {
    
}

export interface ICategoriaInformacion {
    idCategoriaInformacion?: number;
}

export class CategoriaInformacion extends BaseModel implements ICategoriaInformacion {
    // Objection
    static tableName = 'CategoriaInformacion';
    static idColumn = 'idCategoriaInformacion';
    // Objection Modifiers
    static columnList = ['idCategoriaInformacion'];

    // Columns
    idCategoriaInformacion?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(categoriaInformacion?: any){
        super();
        if(categoriaInformacion!==undefined){
            this.idCategoriaInformacion = categoriaInformacion.idCategoriaInformacion;
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
                builder.select(...CategoriaInformacion.columnList);
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
