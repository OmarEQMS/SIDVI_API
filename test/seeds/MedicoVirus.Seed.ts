import bcrypt from 'bcrypt';
import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IMedicoVirus, _MedicoVirus } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('MedicoVirus').insert([
		{ idMedicoVirus:1, fkMedico: 1, fkVirus: 1  } as IMedicoVirus,
    ]);
	return knex;
};
