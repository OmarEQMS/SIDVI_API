import bcrypt from 'bcrypt';
import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IUsuario, _Usuario } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('Usuario').insert([
		{ idUsuario:1, nombreCompleto: 'Omar Quintero', usuario: 'omar', contrasena: await bcrypt.hash('1997', Defaults.saltRounds), token: '1997', mimetypeFoto: ContentTypeEnum.JPG, correo:'omar.quintero@omar.com', celular:'7771321625', archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')), rol:_Usuario.Rol.ADMINISTRADOR } as IUsuario,
    ]);
	return knex;
};
