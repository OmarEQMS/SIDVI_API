import bcrypt from 'bcrypt';
import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IUsuario, _Usuario } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('Usuario').insert([
		// { idUsuario:1, matricula: 'A01421754', nombreCompleto: 'Omar Quintero', contrasena: await bcrypt.hash('1997', Defaults.saltRounds), token: '1997', mimetypeFoto: ContentTypeEnum.JPG, archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')), rol:_Usuario.RolEnum.ADMINISTRADOR, correo:'', estatus: _Usuario.EstatusEnum.HABILITADO} as IUsuario,
    ]);
	return knex;
};
