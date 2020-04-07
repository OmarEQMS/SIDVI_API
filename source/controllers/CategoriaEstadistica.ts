import { Handler } from '../types';
import { Response } from '../responses';
import { CategoriaEstadisticaServicio } from '../services';
import { CategoriaEstadistica, _CategoriaEstadistica } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarCategoriaEstadisticas: Handler = async (req, res, next) => {
    const nombre: string = req.swagger.params['nombre'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || CategoriaEstadistica.idColumn;    
    try{
        let response = await CategoriaEstadisticaServicio.listarCategoriaEstadisticas(req, nombre, ordenarPor, ordenarModo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearCategoriaEstadistica: Handler = async (req, res, next) => {
    const categoriaEstadistica: CategoriaEstadistica = req.swagger.params['categoriaEstadistica'].value;
    try{
        let response = await CategoriaEstadisticaServicio.crearCategoriaEstadistica(req, categoriaEstadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerCategoriaEstadistica: Handler = async (req, res, next) => {
    const idCategoriaEstadistica: number = req.swagger.params['idCategoriaEstadistica'].value;
    try{
        let response = await CategoriaEstadisticaServicio.obtenerCategoriaEstadistica(req, idCategoriaEstadistica);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarCategoriaEstadistica: Handler = async (req, res, next) => {
    const idCategoriaEstadistica: number = req.swagger.params['idCategoriaEstadistica'].value;
    const categoriaEstadistica: CategoriaEstadistica = req.swagger.params['categoriaEstadistica'].value;
    try{
        let response = await CategoriaEstadisticaServicio.actualizarCategoriaEstadistica(req, idCategoriaEstadistica, categoriaEstadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarCategoriaEstadistica: Handler = async (req, res, next) => {
    const idCategoriaEstadistica: number = req.swagger.params['idCategoriaEstadistica'].value;
    try{
        let response = await CategoriaEstadisticaServicio.eliminarCategoriaEstadistica(req, idCategoriaEstadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}
