import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { ICategoriaEstadistica, _CategoriaEstadistica } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('CategoriaEstadistica').insert([
        { idCategoriaEstadistica:1, nombre: 'Casos' } as ICategoriaEstadistica,
        { idCategoriaEstadistica:2, nombre: 'Edad' } as ICategoriaEstadistica,
        { idCategoriaEstadistica:3, nombre: 'Genero' } as ICategoriaEstadistica,
        { idCategoriaEstadistica:4, nombre: 'Hospitalizados' } as ICategoriaEstadistica
    ]);
	return knex;
};
