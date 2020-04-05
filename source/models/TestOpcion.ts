import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _TestOpcion {
    
}

export interface ITestOpcion {
    idTestOpcion?: number;
}

export class TestOpcion extends BaseModel implements ITestOpcion {
    // Objection
    static tableName = 'TestOpcion';
    static idColumn = 'idTestOpcion';
    // Objection Modifiers
    static columnList = ['idTestOpcion'];

    // Columns
    idTestOpcion?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(testOpcion?: any){
        super();
        if(testOpcion!==undefined){
            this.idTestOpcion = testOpcion.idTestOpcion;
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
                builder.select(...TestOpcion.columnList);
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
