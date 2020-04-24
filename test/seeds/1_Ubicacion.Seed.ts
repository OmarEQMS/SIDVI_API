import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IUbicacion, _Ubicacion } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('Ubicacion').insert([
        { idUbicacion:1, fkUbicacion: null, clave: 'mexico', nombre: 'México', latitud: 0.5, longitud:0.5 } as IUbicacion,
        { idUbicacion:2, fkUbicacion: 1, clave: 'morelos', nombre: 'Morelos', latitud: 0.5, longitud:0.5 } as IUbicacion,
		{ idUbicacion:3, fkUbicacion: 1, clave: 'veracruz', nombre: 'Veracruz', latitud: 0.5, longitud:0.5 } as IUbicacion,
		{ idUbicacion:4, fkUbicacion: 1, clave: 'monterrey', nombre: 'Monterrey', latitud: 0.5, longitud:0.5 } as IUbicacion,
		{ idUbicacion:5, fkUbicacion: null, clave: 'eu', nombre: 'Estados Unidos', latitud: 0.5, longitud:0.5 } as IUbicacion,
		{ idUbicacion:6, fkUbicacion: 5, clave: 'ny', nombre: 'New York', latitud: 0.5, longitud:0.5 } as IUbicacion,
		{ idUbicacion:7, fkUbicacion: 5, clave: 'wash', nombre: 'Washinton', latitud: 0.5, longitud:0.5 } as IUbicacion,
		{ idUbicacion:8, fkUbicacion: 7, clave: 'seat', nombre: 'Seattle', latitud: 0.5, longitud:0.5 } as IUbicacion,
		{ idUbicacion:9, fkUbicacion: 2, clave: 'cva', nombre: 'Cuernavaca', latitud: 0.5, longitud:0.5 } as IUbicacion
    ]);
	return knex;
};
