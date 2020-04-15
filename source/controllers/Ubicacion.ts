import { Handler } from '../types';
import { Response } from '../responses';
import { UbicacionServicio } from '../services';
import { Ubicacion, _Ubicacion } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarUbicaciones: Handler = async (req, res, next) => {
    const fkUbicacion: number = req.swagger.params['fkUbicacion'].value;
    const clave: string = req.swagger.params['clave'].value;
    const nombre: string = req.swagger.params['nombre'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Ubicacion.idColumn;    
    try{
        let response = await UbicacionServicio.listarUbicaciones(req, fkUbicacion, clave, nombre, ordenarPor, ordenarModo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearUbicacion: Handler = async (req, res, next) => {
    const ubicacion: Ubicacion = req.swagger.params['ubicacion'].value;
    try{
        let response = await UbicacionServicio.crearUbicacion(req, ubicacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerUbicacion: Handler = async (req, res, next) => {
    const idUbicacion: number = req.swagger.params['idUbicacion'].value;
    try{
        let response = await UbicacionServicio.obtenerUbicacion(req, idUbicacion);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarUbicacion: Handler = async (req, res, next) => {
    const idUbicacion: number = req.swagger.params['idUbicacion'].value;
    const ubicacion: Ubicacion = req.swagger.params['ubicacion'].value;
    try{
        let response = await UbicacionServicio.actualizarUbicacion(req, idUbicacion, ubicacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarUbicacion: Handler = async (req, res, next) => {
    const idUbicacion: number = req.swagger.params['idUbicacion'].value;
    try{
        let response = await UbicacionServicio.eliminarUbicacion(req, idUbicacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}
