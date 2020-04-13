import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IUbicacion, _Ubicacion } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('Ubicacion').insert([
        { idUbicacion:1, fkUbicacion: null, clave: 'mexico', nombre: 'México' } as IUbicacion,
        { idUbicacion:2, fkUbicacion: 1, clave: 'morelos', nombre: 'Morelos' } as IUbicacion,
		{ idUbicacion:3, fkUbicacion: 1, clave: 'veracruz', nombre: 'Veracruz' } as IUbicacion,
		{ idUbicacion:4, fkUbicacion: 1, clave: 'monterrey', nombre: 'Monterrey' } as IUbicacion,
		{ idUbicacion:5, fkUbicacion: null, clave: 'eu', nombre: 'Estados Unidos' } as IUbicacion,
		{ idUbicacion:6, fkUbicacion: 5, clave: 'ny', nombre: 'New York' } as IUbicacion,
		{ idUbicacion:7, fkUbicacion: 5, clave: 'wash', nombre: 'Washinton' } as IUbicacion,
		{ idUbicacion:8, fkUbicacion: 7, clave: 'seat', nombre: 'Seattle' } as IUbicacion
    ]);
	return knex;
};
