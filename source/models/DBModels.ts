import { Usuario } from './Usuario';

export interface DBModels{
    Usuario: typeof Usuario
}

export const DBModels = {
    Usuario
}