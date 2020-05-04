import { Handler } from '../types';
import { Response } from '../responses';
import { SubcategoriaEstadisticaServicio } from '../services';
import { SubcategoriaEstadistica, _SubcategoriaEstadistica } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarSubcategoriaEstadisticas: Handler = async (req, res, next) => {    
    const fkCategoriaEstadistica: number = req.swagger.params['fkCategoriaEstadistica'].value;
    const nombre: string = req.swagger.params['nombre'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || SubcategoriaEstadistica.idColumn;    
    try{
        let response = await SubcategoriaEstadisticaServicio.listarSubcategoriaEstadisticas(req, fkCategoriaEstadistica, nombre, ordenarPor, ordenarModo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearSubcategoriaEstadistica: Handler = async (req, res, next) => {
    const subcategoriaEstadistica: SubcategoriaEstadistica = req.swagger.params['subcategoriaEstadistica'].value;
    try{
        let response = await SubcategoriaEstadisticaServicio.crearSubcategoriaEstadistica(req, subcategoriaEstadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerSubcategoriaEstadistica: Handler = async (req, res, next) => {
    const idSubcategoriaEstadistica: number = req.swagger.params['idSubcategoriaEstadistica'].value;
    try{
        let response = await SubcategoriaEstadisticaServicio.obtenerSubcategoriaEstadistica(req, idSubcategoriaEstadistica);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarSubcategoriaEstadistica: Handler = async (req, res, next) => {
    const idSubcategoriaEstadistica: number = req.swagger.params['idSubcategoriaEstadistica'].value;
    const subcategoriaEstadistica: SubcategoriaEstadistica = req.swagger.params['subcategoriaEstadistica'].value;
    try{
        let response = await SubcategoriaEstadisticaServicio.actualizarSubcategoriaEstadistica(req, idSubcategoriaEstadistica, subcategoriaEstadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarSubcategoriaEstadistica: Handler = async (req, res, next) => {
    const idSubcategoriaEstadistica: number = req.swagger.params['idSubcategoriaEstadistica'].value;
    try{
        let response = await SubcategoriaEstadisticaServicio.eliminarSubcategoriaEstadistica(req, idSubcategoriaEstadistica);
        res.respond(response);
    }catch(error){
        next(error);
    }
}
