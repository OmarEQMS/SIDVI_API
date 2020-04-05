import { Usuario } from './Usuario';
import { Virus } from './Virus';
import { TestNodo } from './TestNodo';
import { TestOpcion } from './TestOpcion';
import { CategoriaInformacion } from './CategoriaInformacion';
import { Informacion } from './Informacion';
import { Ubicacion } from './Ubicacion';
import { CategoriaEstadistica } from './CategoriaEstadistica';
import { Estadistica } from './Estadistica';
import { Medico } from './Medico';
import { MedicoVirus } from './MedicoVirus';
import { Valoracion } from './Valoracion';
import { CelularEstado } from './CelularEstado';

export interface DBModels{
    Usuario: typeof Usuario,
    Virus: typeof Virus,
    TestNodo: typeof TestNodo,
    TestOpcion: typeof TestOpcion,
    CategoriaInformacion: typeof CategoriaInformacion,
    Informacion: typeof Informacion,
    Ubicacion: typeof Ubicacion,
    CategoriaEstadistica: typeof CategoriaEstadistica,
    Estadistica: typeof Estadistica,
    Medico: typeof Medico,
    MedicoVirus: typeof MedicoVirus,
    Valoracion: typeof Valoracion,
    CelularEstado: typeof CelularEstado
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
    Estadistica,
    Medico,
    MedicoVirus,
    Valoracion,
    CelularEstado
}