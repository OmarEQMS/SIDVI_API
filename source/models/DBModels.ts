import { Usuario } from './Usuario';
import { Virus } from './Virus';
import { TestNodo } from './TestNodo';
import { TestOpcion } from './TestOpcion';
import { CategoriaInformacion } from './CategoriaInformacion';
import { Informacion } from './Informacion';
import { Ubicacion } from './Ubicacion';
import { CategoriaEstadistica } from './CategoriaEstadistica';
import { SubcategoriaEstadistica } from './SubcategoriaEstadistica';
import { Estadistica } from './Estadistica';
import { Medico } from './Medico';
import { MedicoVirus } from './MedicoVirus';
import { Valoracion } from './Valoracion';

export interface DBModels{
    Usuario: typeof Usuario,
    Virus: typeof Virus,
    TestNodo: typeof TestNodo,
    TestOpcion: typeof TestOpcion,
    CategoriaInformacion: typeof CategoriaInformacion,
    Informacion: typeof Informacion,
    Ubicacion: typeof Ubicacion,
    CategoriaEstadistica: typeof CategoriaEstadistica,
    SubcategoriaEstadistica: typeof SubcategoriaEstadistica,
    Estadistica: typeof Estadistica,
    Medico: typeof Medico,
    MedicoVirus: typeof MedicoVirus,
    Valoracion: typeof Valoracion
}

export const DBModels = {
    Usuario,
    Virus,
    TestNodo,
    TestOpcion,
    CategoriaInformacion,
    Informacion,
    Ubicacion,
    CategoriaEstadistica,
    SubcategoriaEstadistica,
    Estadistica,
    Medico,
    MedicoVirus,
    Valoracion
}