import Knex from 'knex';
import * as path from 'path';
import * as fs from 'fs';

import { IInformacion, _Informacion } from '../../source/models';
import { Defaults, ContentTypeEnum } from '../../source/api';

export const seed = async (knex: Knex) => {
	await knex('Informacion').insert([
		{ idInformacion:1, fkVirus: 1, fkCategoriaInformacion: 1, texto: 'Medidas de prevencion contra el Covid19', descripcion: 'Lee cuidadosamente las medidas de prevencion', mimetype: ContentTypeEnum.JPG, archivo : fs.readFileSync(path.resolve(__dirname, '..', 'files', 'imagen1.jpg')) } as IInformacion,
		{ idInformacion:2, fkVirus: 1, fkCategoriaInformacion: 1, texto: 'Medidas de higiene contra el Covid19', descripcion: 'Lee cuidadosamente las medidas de prevencion', mimetype: ContentTypeEnum.PDF, archivo : fs.readFileSync(path.resolve(__dirname, '..', 'files', 'archivoPdf1.pdf')) } as IInformacion,
		{ idInformacion:3, fkVirus: 1, fkCategoriaInformacion: 1, texto: 'Medidas de cuidado contra el Covid19', descripcion: 'Lee cuidadosamente las medidas de prevencion', mimetype: ContentTypeEnum.JPG, archivo : fs.readFileSync(path.resolve(__dirname, '..', 'files', 'imagen1.jpg')) } as IInformacion,
    ]);
	return knex;
};
