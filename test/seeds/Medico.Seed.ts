import bcrypt from 'bcrypt';
import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IUsuario, _Usuario, IMedico } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('Medico').insert([
		{ idMedico:1, fkUsuario: 1, fkUbicacion: 1, nombreConsultorio: 'La esquina feliz', nombreDoctor: 'Dr. Quintero', direccionConsultorio: 'Tulum# 106', telefonoConsultorio: '7771326125', descripcion: 'En este consultorio, sera el mejor atendido', mimetypeFoto: ContentTypeEnum.JPG, archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')) } as IMedico,
    ]);
	return knex;
};
