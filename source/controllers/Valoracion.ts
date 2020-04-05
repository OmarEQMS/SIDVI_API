import { Handler } from '../types';
import { Response } from '../responses';
import { ValoracionServicio } from '../services';
import { Valoracion, _Valoracion } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarValoracions: Handler = async (req, res, next) => {
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Valoracion.idColumn;    
    try{
        let response = await ValoracionServicio.listarValoraciones(req, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
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
