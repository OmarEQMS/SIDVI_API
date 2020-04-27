import bcrypt from 'bcrypt';
import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { ITestNodo, _TestNodo } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('TestNodo').insert([
		{ idTestNodo:1, fkVirus: 1, texto: 'Nodo 1', descripcion: 'Descripcion', mimetype: ContentTypeEnum.MP4, archivo: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'video1.mp4')) } as ITestNodo,
    ]);
	return knex;
};
