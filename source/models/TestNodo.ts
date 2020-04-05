import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _TestNodo {
    
}

export interface ITestNodo {
    idTestNodo?: number;
}

export class TestNodo extends BaseModel implements ITestNodo {
    // Objection
    static tableName = 'TestNodo';
    static idColumn = 'idTestNodo';
    // Objection Modifiers
    static columnList = ['idTestNodo'];

    // Columns
    idTestNodo?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(testNodo?: any){
        super();
        if(testNodo!==undefined){
            this.idTestNodo = testNodo.idTestNodo;
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
                builder.select(...TestNodo.columnList);
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
