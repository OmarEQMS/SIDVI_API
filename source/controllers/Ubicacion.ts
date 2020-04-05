import { Handler } from '../types';
import { Response } from '../responses';
import { UbicacionServicio } from '../services';
import { Ubicacion, _Ubicacion } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarUbicacions: Handler = async (req, res, next) => {
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Ubicacion.idColumn;    
    try{
        let response = await UbicacionServicio.listarUbicaciones(req, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
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
