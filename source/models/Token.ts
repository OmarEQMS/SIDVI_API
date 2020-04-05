import { Usuario, _Usuario } from "./Usuario";
import { getDate } from "../tools/Utils";

export interface IToken {
    idUsuario?: number;
    matricula: string;
    nombreCompleto: string;
    rol?: _Usuario.RolEnum;
    expire: Date;
}
export class Token implements IToken {
    idUsuario?: number;
    matricula: string;
    nombreCompleto: string;
    rol?: _Usuario.RolEnum;
    expire: Date;

    constructor(usuario: Usuario){
        this.idUsuario = usuario.idUsuario;
        this.matricula = usuario.matricula;
        this.nombreCompleto = usuario.nombreCompleto;
        this.rol = usuario.rol;
        this.expire = getDate();
    }
}