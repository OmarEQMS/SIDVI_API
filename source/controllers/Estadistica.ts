import { Handler } from '../types';
import { Response } from '../responses';
import { EstadisticaServicio } from '../services';
import { Estadistica, _Estadistica } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarEstadisticas: Handler = async (req, res, next) => {
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Estadistica.idColumn;    
    try{
        let response = await EstadisticaServicio.listarEstadisticas(req, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearEstadistica: Handler = async (req, res, next) => {
    const estadistica: Estadistica = req.swagger.params['estadistica'].value;
    try{
        let response = await EstadisticaServicio.crearEstadistica(req, estadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerEstadistica: Handler = async (req, res, next) => {
    const idEstadistica: number = req.swagger.params['idEstadistica'].value;
    try{
        let response = await EstadisticaServicio.obtenerEstadistica(req, idEstadistica);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarEstadistica: Handler = async (req, res, next) => {
    const idEstadistica: number = req.swagger.params['idEstadistica'].value;
    const estadistica: Estadistica = req.swagger.params['estadistica'].value;
    try{
        let response = await EstadisticaServicio.actualizarEstadistica(req, idEstadistica, estadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarEstadistica: Handler = async (req, res, next) => {
    const idEstadistica: number = req.swagger.params['idEstadistica'].value;
    try{
        let response = await EstadisticaServicio.eliminarEstadistica(req, idEstadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}
