import { RelationMappings, Model } from 'objection';

import { BaseModel, Virus, Ubicacion, SubcategoriaEstadistica } from '../models';
import { fileToBase64 } from '../tools/Utils';
import { ContentTypeEnum, Defaults } from '../api';
import { Log } from '../tools';

export namespace _Estadistica {
    
}

export interface IEstadistica {
    idEstadistica?: number;
    fkVirus?: number;
    fkUbicacion?: number;
    fkSubcategoriaEstadistica1?: number;
    fkSubcategoriaEstadistica2?: number;
    valor?: number;
    fecha?: Date;
}

export class Estadistica extends BaseModel implements IEstadistica {
    // Objection
    static tableName = 'Estadistica';
    static idColumn = 'idEstadistica';
    // Objection Modifiers
    static columnList = ['idEstadistica', 'fkVirus', 'fkUbicacion', 'fkSubcategoriaEstadistica1', 'fkSubcategoriaEstadistica2', 'valor', 'fecha'];

    // Columns
    idEstadistica?: number;
    fkVirus?: number;
    fkUbicacion?: number;
    fkSubcategoriaEstadistica1?: number;
    fkSubcategoriaEstadistica2?: number;
    valor?: number;
    fecha?: Date;

    //Relations: BelongsToOne
    virus: Virus;
    ubicacion: Ubicacion;
    subcategoriaEstadistica1: SubcategoriaEstadistica;
    subcategoriaEstadistica2: SubcategoriaEstadistica;

    // Relations: HasMany

    // Constructor
    constructor(estadistica?: any){
        super();
        if(estadistica!==undefined){
            this.idEstadistica = estadistica.idEstadistica;
            this.fkVirus = estadistica.fkVirus;
            this.fkUbicacion = estadistica.fkUbicacion;
            this.fkSubcategoriaEstadistica1 = estadistica.fkSubcategoriaEstadistica1;
            this.fkSubcategoriaEstadistica2 = estadistica.fkSubcategoriaEstadistica2;
            this.valor = estadistica.valor;
            this.fecha = estadistica.fecha;
            // Relations
            this.subcategoriaEstadistica1 = new SubcategoriaEstadistica(estadistica.SubcategoriaEstadistica1);
            this.subcategoriaEstadistica2 = new SubcategoriaEstadistica(estadistica.SubcategoriaEstadistica2);
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
                builder.select(...Estadistica.columnList);
            }
        };
    }

    // Objection: Relations
    static relationMappings: RelationMappings = {
        //------------------------------------- HasManyRelation

        //------------------------------------- HasOneRelation

        //------------------------------------- BelongsToOneRelation  
        Virus: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Virus',
            join: { from: 'Estadistica.fkVirus', to: 'Virus.idVirus' }
        },
        Ubicacion: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'Ubicacion',
            join: { from: 'Estadistica.fkUbicacion', to: 'Ubicacion.idUbicacion' }
        },
        SubcategoriaEstadistica1: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'SubcategoriaEstadistica',
            join: { from: 'Estadistica.fkSubcategoriaEstadistica1', to: 'SubcategoriaEstadistica.idSubcategoriaEstadistica' }
        },
        SubcategoriaEstadistica2: {
            relation: Model.BelongsToOneRelation,
            modelClass: 'SubcategoriaEstadistica',
            join: { from: 'Estadistica.fkSubcategoriaEstadistica2', to: 'SubcategoriaEstadistica.idSubcategoriaEstadistica' }
        }

        //------------------------------------- HasOneThroughRelation
    };

}
