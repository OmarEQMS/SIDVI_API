import { Handler } from '../types';
import { Response } from '../responses';
import { CategoriaInformacionServicio } from '../services';
import { CategoriaInformacion, _CategoriaInformacion } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarCategoriaInformacions: Handler = async (req, res, next) => {
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || CategoriaInformacion.idColumn;    
    try{
        let response = await CategoriaInformacionServicio.listarCategoriaInformacion(req, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearCategoriaInformacion: Handler = async (req, res, next) => {
    const categoriaInformacion: CategoriaInformacion = req.swagger.params['categoriaInformacion'].value;
    try{
        let response = await CategoriaInformacionServicio.crearCategoriaInformacion(req, categoriaInformacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerCategoriaInformacion: Handler = async (req, res, next) => {
    const idCategoriaInformacion: number = req.swagger.params['idCategoriaInformacion'].value;
    try{
        let response = await CategoriaInformacionServicio.obtenerCategoriaInformacion(req, idCategoriaInformacion);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarCategoriaInformacion: Handler = async (req, res, next) => {
    const idCategoriaInformacion: number = req.swagger.params['idCategoriaInformacion'].value;
    const categoriaInformacion: CategoriaInformacion = req.swagger.params['categoriaInformacion'].value;
    try{
        let response = await CategoriaInformacionServicio.actualizarCategoriaInformacion(req, idCategoriaInformacion, categoriaInformacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarCategoriaInformacion: Handler = async (req, res, next) => {
    const idCategoriaInformacion: number = req.swagger.params['idCategoriaInformacion'].value;
    try{
        let response = await CategoriaInformacionServicio.eliminarCategoriaInformacion(req, idCategoriaInformacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}
