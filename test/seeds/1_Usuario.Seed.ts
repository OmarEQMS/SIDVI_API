import bcrypt from 'bcrypt';
import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IUsuario, _Usuario } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';
import { generateCode } from '../../source/tools/Utils';

export const seed = async (knex: Knex) => {
	await knex('Usuario').insert([
		{ idUsuario:1, nombreCompleto: 'Omar Quintero', usuario: 'omar', contrasena: await bcrypt.hash('1997', Defaults.saltRounds), token: generateCode(Defaults.codeAlphabet, Defaults.codeLength), mimetypeFoto: ContentTypeEnum.JPG, correo:'omar.quintero@omar.com', celular:'7771321625', archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')), rol:_Usuario.Rol.ADMINISTRADOR } as IUsuario,
		{ idUsuario:2, nombreCompleto: 'Angelica Guemes', usuario: 'angie', contrasena: await bcrypt.hash('123', Defaults.saltRounds), token: generateCode(Defaults.codeAlphabet, Defaults.codeLength), mimetypeFoto: ContentTypeEnum.JPG, correo:'angieguemes@gmail.com', celular:'7771321625', archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'angieImg.jpg')), rol:_Usuario.Rol.USUARIO } as IUsuario,
		{ idUsuario:3, nombreCompleto: 'Diego Montoya', usuario: 'diego', contrasena: await bcrypt.hash('123', Defaults.saltRounds), token: generateCode(Defaults.codeAlphabet, Defaults.codeLength), mimetypeFoto: ContentTypeEnum.JPG, correo:'diego@gmail.com', celular:'7771321645', archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'dieguito.jpg')), rol:_Usuario.Rol.ADMINISTRADOR } as IUsuario,
		{ idUsuario:4, nombreCompleto: 'Fer Orduña', usuario: 'fer', contrasena: await bcrypt.hash('123', Defaults.saltRounds), token: generateCode(Defaults.codeAlphabet, Defaults.codeLength), mimetypeFoto: ContentTypeEnum.JPG, correo:'fer@gmail.com', celular:'7771321625', archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'fer.jpg')), rol:_Usuario.Rol.USUARIO } as IUsuario,
		{ idUsuario:5, nombreCompleto: 'Miguel Gomez', usuario: 'miguel', contrasena: await bcrypt.hash('123', Defaults.saltRounds), token: generateCode(Defaults.codeAlphabet, Defaults.codeLength), mimetypeFoto: ContentTypeEnum.JPG, correo:'miguel@gmail.com', celular:'7771221625', archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'dude1.jpg')), rol:_Usuario.Rol.USUARIO } as IUsuario,
		{ idUsuario:6, nombreCompleto: 'Maria Rosas', usuario: 'mari', contrasena: await bcrypt.hash('123', Defaults.saltRounds), token: generateCode(Defaults.codeAlphabet, Defaults.codeLength), mimetypeFoto: ContentTypeEnum.JPG, correo:'maria@gmail.com', celular:'7771321645', archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'dude2.png')), rol:_Usuario.Rol.ADMINISTRADOR } as IUsuario,
    ]);
	return knex;
};
