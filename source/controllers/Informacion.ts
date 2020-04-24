import { Handler } from '../types';
import { Response } from '../responses';
import { InformacionServicio } from '../services';
import { Informacion, _Informacion } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarInformaciones: Handler = async (req, res, next) => {
    const fkVirus: number = req.swagger.params['fkVirus'].value;
    const fkCategoriaInformacion: number = req.swagger.params['fkCategoriaInformacion'].value;
    const texto: string = req.swagger.params['texto'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Informacion.idColumn;    
    try{
        let response = await InformacionServicio.listarInformaciones(req, fkVirus, fkCategoriaInformacion, texto, ordenarPor, ordenarModo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearInformacion: Handler = async (req, res, next) => {
    const informacion: Informacion = req.swagger.params['informacion'].value;
    try{
        let response = await InformacionServicio.crearInformacion(req, informacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerInformacion: Handler = async (req, res, next) => {
    const idInformacion: number = req.swagger.params['idInformacion'].value;
    try{
        let response = await InformacionServicio.obtenerInformacion(req, idInformacion);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarInformacion: Handler = async (req, res, next) => {
    const idInformacion: number = req.swagger.params['idInformacion'].value;    
    const informacion: Informacion = req.swagger.params['informacion'].value;
    try{
        let response = await InformacionServicio.actualizarInformacion(req, idInformacion, informacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarInformacion: Handler = async (req, res, next) => {
    const idInformacion: number = req.swagger.params['idInformacion'].value;
    try{
        let response = await InformacionServicio.eliminarInformacion(req, idInformacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const descargarInformacionArchivo: Handler = async (req, res, next) => {
    const idInformacion: number = req.swagger.params['idInformacion'].value;
    try{
        let response = await InformacionServicio.descargarInformacionArchivo(req, idInformacion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const cargarInformacionArchivo: Handler = async (req, res, next) => {
    const idInformacion: number = req.swagger.params['idInformacion'].value;
    const archivo: any = req.swagger.params['archivo'].value;
    try{
        let response = await InformacionServicio.cargarInformacionArchivo(req, idInformacion, archivo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}