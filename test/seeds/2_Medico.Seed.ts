import bcrypt from 'bcrypt';
import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IUsuario, _Usuario, IMedico, _Medico } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('Medico').insert([
		{ idMedico:1, fkUsuario: 1, fkUbicacion: 1, nombreConsultorio: 'La esquina feliz', nombreDoctor: 'Dr. Quintero', direccionConsultorio: 'Tulum# 106', telefonoConsultorio: '7771326125', cedulaProfesional: 'ABC123', descripcion: 'En este consultorio, sera el mejor atendido', mimetypeFoto: ContentTypeEnum.JPG, archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')), estatus: _Medico.Estatus.ACEPTADO } as IMedico,
		{ idMedico:2, fkUsuario: 2, fkUbicacion: 9, nombreConsultorio: 'Consultorio del sol', nombreDoctor: 'Dra. Angelica', direccionConsultorio: 'Teopanzolco 100', telefonoConsultorio: '7773225906', cedulaProfesional: '123456', descripcion: 'En este consultorio, sera el mejor atendido', mimetypeFoto: ContentTypeEnum.JPG, archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')), estatus: _Medico.Estatus.ACEPTADO } as IMedico,
		{ idMedico:3, fkUsuario: 2, fkUbicacion: 4, nombreConsultorio: 'Sin Nombre', nombreDoctor: 'Dra. Angelica', direccionConsultorio: 'Tulum# 1019', telefonoConsultorio: '7773225906', cedulaProfesional: '123456', descripcion: 'En este consultorio, sera el mejor atendido', mimetypeFoto: ContentTypeEnum.JPG, archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')), estatus: _Medico.Estatus.ACEPTADO } as IMedico,
		{ idMedico:4, fkUsuario: 2, fkUbicacion: 3, nombreConsultorio: 'El médico 1000', nombreDoctor: 'Dra. Angelica', direccionConsultorio: 'Ajusco 56', telefonoConsultorio: '7773225906', cedulaProfesional: '123456', descripcion: 'En este consultorio, sera el mejor atendido', mimetypeFoto: ContentTypeEnum.JPG, archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')), estatus: _Medico.Estatus.ACEPTADO } as IMedico,
		{ idMedico:5, fkUsuario: 2, fkUbicacion: 1, nombreConsultorio: 'Consultorio 3222', nombreDoctor: 'Dra. Angelica', direccionConsultorio: 'Calle Iztapalapa', telefonoConsultorio: '7773225906', cedulaProfesional: '123456', descripcion: 'En este consultorio, sera el mejor atendido', mimetypeFoto: ContentTypeEnum.JPG, archivoFoto: fs.readFileSync(path.resolve(__dirname, '..', 'files', 'perfilOmar.jpg')), estatus: _Medico.Estatus.ACEPTADO } as IMedico,
    ]);
	return knex;
};
