import { Handler } from '../types';
import { Response } from '../responses';
import { ValoracionServicio } from '../services';
import { Valoracion, _Valoracion } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarValoracions: Handler = async (req, res, next) => {
    const fkMedicoVirus: number = req.swagger.params['fkMedicoVirus'].value;
    const fkUsuario: number = req.swagger.params['fkUsuario'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Valoracion.idColumn;    
    try{
        let response = await ValoracionServicio.listarValoraciones(req, fkMedicoVirus, fkUsuario, ordenarPor, ordenarModo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearValoracion: Handler = async (req, res, next) => {
    const valoracion: Valoracion = req.swagger.params['valoracion'].value;
    try{
        let response = await ValoracionServicio.crearValoracion(req, valoracion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerValoracion: Handler = async (req, res, next) => {
    const idValoracion: number = req.swagger.params['idValoracion'].value;
    try{
        let response = await ValoracionServicio.obtenerValoracion(req, idValoracion);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarValoracion: Handler = async (req, res, next) => {
    const idValoracion: number = req.swagger.params['idValoracion'].value;
    const valoracion: Valoracion = req.swagger.params['valoracion'].value;
    try{
        let response = await ValoracionServicio.actualizarValoracion(req, idValoracion, valoracion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarValoracion: Handler = async (req, res, next) => {
    const idValoracion: number = req.swagger.params['idValoracion'].value;
    try{
        let response = await ValoracionServicio.eliminarValoracion(req, idValoracion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}
