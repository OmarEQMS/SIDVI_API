import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { ISubcategoriaEstadistica, _SubcategoriaEstadistica } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('SubcategoriaEstadistica').insert([
        { idSubcategoriaEstadistica:1, fkCategoriaEstadistica: 1, nombre: 'Casos Activos' } as ISubcategoriaEstadistica
    ]);
	return knex;
};
