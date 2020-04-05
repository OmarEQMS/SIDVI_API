import { Handler } from '../types';
import { Response } from '../responses';
import { TestNodoServicio } from '../services';
import { TestNodo, _TestNodo } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarTestNodos: Handler = async (req, res, next) => {
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || TestNodo.idColumn;    
    try{
        let response = await TestNodoServicio.listarTestNodos(req, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearTestNodo: Handler = async (req, res, next) => {
    const testNodo: TestNodo = req.swagger.params['TestNodo'].value;
    try{
        let response = await TestNodoServicio.crearTestNodo(req, testNodo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerTestNodo: Handler = async (req, res, next) => {
    const idTestNodo: number = req.swagger.params['idTestNodo'].value;
    try{
        let response = await TestNodoServicio.obtenerTestNodo(req, idTestNodo);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarTestNodo: Handler = async (req, res, next) => {
    const idTestNodo: number = req.swagger.params['idTestNodo'].value;
    const testNodo: TestNodo = req.swagger.params['TestNodo'].value;
    try{
        let response = await TestNodoServicio.actualizarTestNodo(req, idTestNodo, testNodo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarTestNodo: Handler = async (req, res, next) => {
    const idTestNodo: number = req.swagger.params['idTestNodo'].value;
    try{
        let response = await TestNodoServicio.eliminarTestNodo(req, idTestNodo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const descargarTestNodoArchivo: Handler = async (req, res, next) => {
    const idTestNodo: number = req.swagger.params['idTestNodo'].value;
    try{
        let response = await TestNodoServicio.descargarTestNodoArchivo(req, idTestNodo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const cargarTestNodoArchivo: Handler = async (req, res, next) => {
    const idTestNodo: number = req.swagger.params['idTestNodo'].value;
    const archivo: any = req.swagger.params['archivo'].value;
    try{
        let response = await TestNodoServicio.cargarTestNodoArchivo(req, idTestNodo, archivo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}