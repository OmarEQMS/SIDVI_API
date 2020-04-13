import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { ICategoriaEstadistica, _CategoriaEstadistica } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('CategoriaEstadistica').insert([
        { idCategoriaEstadistica:1, nombre: 'Casos Activos' } as ICategoriaEstadistica
    ]);
	return knex;
};
