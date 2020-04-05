import { Handler } from '../types';
import { Response } from '../responses';
import { CelularEstadoServicio } from '../services';
import { CelularEstado, _CelularEstado } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarCelularEstados: Handler = async (req, res, next) => {
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || CelularEstado.idColumn;    
    try{
        let response = await CelularEstadoServicio.listarCelularEstados(req, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearCelularEstado: Handler = async (req, res, next) => {
    const celularEstado: CelularEstado = req.swagger.params['celularEstado'].value;
    try{
        let response = await CelularEstadoServicio.crearCelularEstado(req, celularEstado);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerCelularEstado: Handler = async (req, res, next) => {
    const idCelularEstado: number = req.swagger.params['idCelularEstado'].value;
    try{
        let response = await CelularEstadoServicio.obtenerCelularEstado(req, idCelularEstado);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarCelularEstado: Handler = async (req, res, next) => {
    const idCelularEstado: number = req.swagger.params['idCelularEstado'].value;
    const celularEstado: CelularEstado = req.swagger.params['celularEstado'].value;
    try{
        let response = await CelularEstadoServicio.actualizarCelularEstado(req, idCelularEstado, celularEstado);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarCelularEstado: Handler = async (req, res, next) => {
    const idCelularEstado: number = req.swagger.params['idCelularEstado'].value;
    try{
        let response = await CelularEstadoServicio.eliminarCelularEstado(req, idCelularEstado);
        res.respond(response);
    }catch(error){
        next(error);
    }
}
