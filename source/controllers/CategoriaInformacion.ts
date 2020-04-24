import { Handler } from '../types';
import { Response } from '../responses';
import { CategoriaInformacionServicio } from '../services';
import { CategoriaInformacion, _CategoriaInformacion } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarCategoriasInformacion: Handler = async (req, res, next) => {
    const clave: string = req.swagger.params['clave'].value;    
    const nombre: string = req.swagger.params['nombre'].value;    
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || CategoriaInformacion.idColumn;    
    try{
        let response = await CategoriaInformacionServicio.listarCategoriasInformaciones(req, clave, nombre, ordenarPor, ordenarModo);
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
