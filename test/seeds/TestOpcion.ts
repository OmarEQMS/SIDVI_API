import bcrypt from 'bcrypt';
import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { ITestOpcion, _TestOpcion } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('TestOpcion').insert([
        { idTestOpcion:1, fkTestNodo: 1, fkTestNodoSig: 1, texto: 'Opcion 1', clave: '1', descripcion: 'Descripcion', mimetype: ContentTypeEnum.JPG, archivo: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'imagen1.jpg')) } as ITestOpcion,
    ]);
	return knex;
};
