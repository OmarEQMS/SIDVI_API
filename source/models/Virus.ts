import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _Virus {
    export type Estatus = 'x';
}

export interface IVirus {
    idVirus?: number;
}

export class Virus extends BaseModel implements IVirus {
    // Objection
    static tableName = 'Virus';
    static idColumn = 'idVirus';
    // Objection Modifiers
    static columnList = ['idVirus'];

    // Columns
    idVirus?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(virus?: any){
        super();
        if(virus!==undefined){
            this.idVirus = virus.idVirus;
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
                builder.select(...Virus.columnList);
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
