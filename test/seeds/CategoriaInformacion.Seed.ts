import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { ICategoriaInformacion, _CategoriaInformacion } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('CategoriaInformacion').insert([
		{ idCategoriaInformacion:1, clave: 'prevencion', nombre: 'Medidas de Prevencion' } as ICategoriaInformacion,
    ]);
	return knex;
};