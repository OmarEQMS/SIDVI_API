import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IEstadistica, _Estadistica } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';
import { createDateStr } from '../../source/tools/Utils';

export const seed = async (knex: Knex) => {
	await knex('Estadistica').insert([
        { idEstadistica:1, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, valor: 50, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:2, fkVirus: 1, fkUbicacion: 2, fkSubcategoriaEstadistica1: 1, valor: 10, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:3, fkVirus: 1, fkUbicacion: 3, fkSubcategoriaEstadistica1: 1, valor: 20, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:4, fkVirus: 1, fkUbicacion: 4, fkSubcategoriaEstadistica1: 1, valor: 20, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:5, fkVirus: 1, fkUbicacion: 5, fkSubcategoriaEstadistica1: 1, valor: 100, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:6, fkVirus: 1, fkUbicacion: 6, fkSubcategoriaEstadistica1: 1, valor: 80, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:7, fkVirus: 1, fkUbicacion: 7, fkSubcategoriaEstadistica1: 1, valor: 20, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:8, fkVirus: 1, fkUbicacion: 8, fkSubcategoriaEstadistica1: 1, valor: 15, fecha: createDateStr('2020-01-01') } as IEstadistica,
        { idEstadistica:9, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, valor:  60, fecha: createDateStr('2020-02-01') } as IEstadistica,
        { idEstadistica:10, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, valor: 70, fecha: createDateStr('2020-03-01') } as IEstadistica,
        { idEstadistica:11, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, valor: 80, fecha: createDateStr('2020-04-01') } as IEstadistica,
        { idEstadistica:12, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, valor: 90, fecha: createDateStr('2020-05-01') } as IEstadistica,
        { idEstadistica:13, fkVirus: 1, fkUbicacion: 1, fkSubcategoriaEstadistica1: 1, valor: 100, fecha: createDateStr('2020-06-01') } as IEstadistica,
    ]);
	return knex;
};
