import { RelationMappings, Model } from 'objection';

import { BaseModel, Estadistica } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';
import { CategoriaEstadistica } from './CategoriaEstadistica';

export namespace _SubcategoriaEstadistica {
    
}

export interface ISubcategoriaEstadistica {
    idSubcategoriaEstadistica?: number;
    fkCategoriaEstadistica?: number;
    nombre?: string;
}

export class SubcategoriaEstadistica extends BaseModel implements ISubcategoriaEstadistica {
    // Objection
    static tableName = 'SubcategoriaEstadistica';
    static idColumn = 'idSubcategoriaEstadistica';
    // Objection Modifiers
    static columnList = ['idSubcategoriaEstadistica', 'fkCategoriaEstadistica', 'nombre'];

    // Columns
    idSubcategoriaEstadistica?: number;
    fkCategoriaEstadistica?: number;
    nombre?: string;

    //Relations: BelongsToOne
    categoriaEstadistica: CategoriaEstadistica;

    // Relations: HasMany
    estadisticas: Estadistica[];

    // Constructor
    constructor(subcategoriaEstadistica?: any){
        super();
        if(subcategoriaEstadistica!==undefined){
            this.idSubcategoriaEstadistica = subcategoriaEstadistica.idSubcategoriaEstadistica;
            this.fkCategoriaEstadistica = subcategoriaEstadistica.fkCategoriaEstadistica;
            this.nombre = subcategoriaEstadistica.nombre;
            // Relations
            this.categoriaEstadistica = new CategoriaEstadistica(subcategoriaEstadistica.CategoriaEstadistica)
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
                builder.select(...SubcategoriaEstadistica.columnList);
            }
        };
    }

    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation
        Estadistica1: {
            relation: Model.HasManyRelation,
            modelClass: 'Estadistica',
            join: { from: 'SubcategoriaEstadistica.idSubcategoriaEstadistica', to: 'Estadistica.fkSubcategoriaEstadistica1' }
        },
        Estadistica2: {
            relation: Model.HasManyRelation,
            modelClass: 'Estadistica',
            join: { from: 'SubcategoriaEstadistica.idSubcategoriaEstadistica', to: 'Estadistica.fkSubcategoriaEstadistica2' }
        },

        //------------------------------------- HasOneRelation

        //------------------------------------- BelongsToOneRelation  
        CategoriaEstadistica: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'CategoriaEstadistica',
            join: { from: 'CategoriaEstadistica.idCategoriaEstadistica', to: 'SubcategoriaEstadistica.fkCategoriaEstadistica' }
        }

        //------------------------------------- HasOneThroughRelation
    };

}
