import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IEstadistica, _Estadistica } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';
import { createDateStr } from '../../source/tools/Utils';

export const seed = async (knex: Knex) => {
	await knex('Estadistica').insert([
        { idEstadistica:1, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 50, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:2, fkVirus: 1, fkUbicacion: 2, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 10, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:3, fkVirus: 1, fkUbicacion: 3, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 20, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:4, fkVirus: 1, fkUbicacion: 4, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 20, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:5, fkVirus: 1, fkUbicacion: 5, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 100, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:6, fkVirus: 1, fkUbicacion: 6, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 80, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:7, fkVirus: 1, fkUbicacion: 7, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 20, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:8, fkVirus: 1, fkUbicacion: 8, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 15, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:9, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor:  60, fecha: createDateStr('2020-02-01') } as IEstadistica,
        { idEstadistica:10, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 70, fecha: createDateStr('2020-03-01') } as IEstadistica,
        { idEstadistica:11, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 80, fecha: createDateStr('2020-04-01') } as IEstadistica,
        { idEstadistica:12, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 90, fecha: createDateStr('2020-05-01') } as IEstadistica,
        { idEstadistica:13, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: null, valor: 100, fecha: createDateStr('2020-06-01') } as IEstadistica,
        
        { idEstadistica:14, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 5, fkSubcategoriaEstadistica2: 9, valor: 0, fecha: createDateStr('2020-05-01') } as IEstadistica,
        { idEstadistica:15, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 5, fkSubcategoriaEstadistica2: 9, valor: 5, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:16, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 6, fkSubcategoriaEstadistica2: 9, valor: 8, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:17, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 7, fkSubcategoriaEstadistica2: 9, valor: 8, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:18, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 8, fkSubcategoriaEstadistica2: 9, valor: 40, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:19, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 5, fkSubcategoriaEstadistica2: 10, valor: 0, fecha: createDateStr('2020-05-01') } as IEstadistica,
        { idEstadistica:20, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 5, fkSubcategoriaEstadistica2: 10, valor: 5, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:21, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 6, fkSubcategoriaEstadistica2: 10, valor: 7, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:22, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 7, fkSubcategoriaEstadistica2: 10, valor: 7, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:23, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 8, fkSubcategoriaEstadistica2: 10, valor: 20, fecha: createDateStr('2020-06-01') } as IEstadistica,

        { idEstadistica:24, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: 9, valor: 80, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:25, fkVirus: 1, fkUbicacion: 2, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: 9, valor: 10, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:26, fkVirus: 1, fkUbicacion: 3, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: 9, valor: 15, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:27, fkVirus: 1, fkUbicacion: 4, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: 9, valor: 20, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:28, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: 10, valor: 20, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:29, fkVirus: 1, fkUbicacion: 2, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: 10, valor: 0, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:30, fkVirus: 1, fkUbicacion: 3, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: 10, valor: 5, fecha: createDateStr('2020-06-01') } as IEstadistica,
        { idEstadistica:31, fkVirus: 1, fkUbicacion: 4, fkSubcategoriaEstadistica1: 1, fkSubcategoriaEstadistica2: 10, valor: 10, fecha: createDateStr('2020-06-01') } as IEstadistica,

    ]);
	return knex;
};
