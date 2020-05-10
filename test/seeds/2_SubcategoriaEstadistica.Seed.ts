import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { ISubcategoriaEstadistica, _SubcategoriaEstadistica } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('SubcategoriaEstadistica').insert([
        { idSubcategoriaEstadistica:1, fkCategoriaEstadistica: 1, nombre: 'Casos Totales' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:2, fkCategoriaEstadistica: 1, nombre: 'Casos Activos' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:3, fkCategoriaEstadistica: 1, nombre: 'Casos Respuerados' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:4, fkCategoriaEstadistica: 1, nombre: 'Defunciones' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:5, fkCategoriaEstadistica: 2, nombre: '0-20' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:6, fkCategoriaEstadistica: 2, nombre: '21-40' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:7, fkCategoriaEstadistica: 2, nombre: '40-60' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:8, fkCategoriaEstadistica: 2, nombre: '60+' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:9, fkCategoriaEstadistica: 3, nombre: 'Hombre' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:10, fkCategoriaEstadistica: 3, nombre: 'Mujer' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:11, fkCategoriaEstadistica: 4, nombre: 'Hospitalizado' } as ISubcategoriaEstadistica,
        { idSubcategoriaEstadistica:12, fkCategoriaEstadistica: 4, nombre: 'No Hospitalizado' } as ISubcategoriaEstadistica
    ]);
	return knex;
};
