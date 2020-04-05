import { RelationMappings, Model } from 'objection';

import { BaseModel } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _MedicoVirus {
    
}

export interface IMedicoVirus {
    idMedicoVirus?: number;
}

export class MedicoVirus extends BaseModel implements IMedicoVirus {
    // Objection
    static tableName = 'MedicoVirus';
    static idColumn = 'idMedicoVirus';
    // Objection Modifiers
    static columnList = ['idMedicoVirus'];

    // Columns
    idMedicoVirus?: number;

    //Relations: BelongsToOne
    
    // Relations: HasMany

    // Constructor
    constructor(medicoVirus?: any){
        super();
        if(medicoVirus!==undefined){
            this.idMedicoVirus = medicoVirus.idMedicoVirus;
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
                builder.select(...MedicoVirus.columnList);
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
