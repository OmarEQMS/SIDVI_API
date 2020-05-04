export type ModelsEnum = 'Usuario' | 'Virus' | 'TestNodo' | 'TestOpcion' | 'CategoriaInformacion' | 'Informacion' | 'Ubicacion' | 'CategoriaEstadistica' | 'SubcategoriaEstadistica' | 'Estadistica' | 'Medico' | 'MedicoVirus' | 'Valoracion' | 'CelularEstado';
export const ModelsEnum = {
    Usuario: 'Usuario' as ModelsEnum,
    Virus: 'Virus' as ModelsEnum,
    TestNodo: 'TestNodo' as ModelsEnum,
    TestOpcion: 'TestOpcion' as ModelsEnum,
    CategoriaInformacion: 'CategoriaInformacion' as ModelsEnum,
    Informacion: 'Informacion' as ModelsEnum,
    Ubicacion: 'Ubicacion' as ModelsEnum,
    CategoriaEstadistica: 'CategoriaEstadistica' as ModelsEnum,
    SubcategoriaEstadistica: 'SubcategoriaEstadistica' as ModelsEnum,
    Estadistica: 'Estadistica' as ModelsEnum,
    Medico: 'Medico' as ModelsEnum,
    MedicoVirus: 'MedicoVirus' as ModelsEnum,
    Valoracion: 'Valoracion' as ModelsEnum,
    CelularEstado: 'CelularEstado' as ModelsEnum
}

export * from './BaseModel';
export * from './DBModels';
export * from './Coleccion';

export * from './Usuario';
export * from './Virus';
export * from './TestNodo';
export * from './TestOpcion';
export * from './CategoriaInformacion';
export * from './Informacion';
export * from './Ubicacion';
export * from './CategoriaEstadistica';
export * from './SubcategoriaEstadistica';
export * from './Estadistica';
export * from './Medico';
export * from './MedicoVirus';
export * from './Valoracion';
export * from './CelularEstado';