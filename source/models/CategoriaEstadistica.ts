import { RelationMappings, Model } from 'objection';

import { BaseModel, Estadistica } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { SubcategoriaEstadistica } from './SubcategoriaEstadistica';

export namespace _CategoriaEstadistica {
    
}

export interface ICategoriaEstadistica {
    idCategoriaEstadistica?: number;
    nombre?: string;
}

export class CategoriaEstadistica extends BaseModel implements ICategoriaEstadistica {
    // Objection
    static tableName = 'CategoriaEstadistica';
    static idColumn = 'idCategoriaEstadistica';
    // Objection Modifiers
    static columnList = ['idCategoriaEstadistica', 'nombre'];

    // Columns
    idCategoriaEstadistica?: number;
    nombre?: string;

    //Relations: BelongsToOne
    
    // Relations: HasMany
    subcategoriaEstadisticas: SubcategoriaEstadistica[];

    // Constructor
    constructor(categoriaEstadistica?: any){
        super();
        if(categoriaEstadistica!==undefined){
            this.idCategoriaEstadistica = categoriaEstadistica.idCategoriaEstadistica;
            this.nombre = categoriaEstadistica.nombre;
            if (categoriaEstadistica.SubcategoriaEstadistica != null)
                this.subcategoriaEstadisticas = categoriaEstadistica.SubcategoriaEstadistica.map((item: any) => new SubcategoriaEstadistica(item));
        }
    }
    
    // Respond Object
    forJSON() {
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
        SubcategoriaEstadistica: {
            relation: Model.HasManyRelation,
            modelClass: 'SubcategoriaEstadistica',
            join: { from: 'CategoriaEstadistica.idCategoriaEstadistica', to: 'SubcategoriaEstadistica.fkCategoriaEstadistica' }
        }

        //------------------------------------- HasOneRelation
        
        //------------------------------------- BelongsToOneRelation  

        //------------------------------------- HasOneThroughRelation
    };

}
