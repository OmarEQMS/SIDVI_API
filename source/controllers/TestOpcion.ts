import { Handler } from '../types';
import { Response } from '../responses';
import { TestOpcionServicio } from '../services';
import { TestOpcion, _TestOpcion } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarTestOpcions: Handler = async (req, res, next) => {
    const fkTestNodo: number = req.swagger.params['fkTestNodo'].value;
    const fkTestNodoSig: number = req.swagger.params['fkTestNodoSig'].value;
    const clave: string = req.swagger.params['clave'].value;
    const texto: string = req.swagger.params['texto'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || TestOpcion.idColumn;    
    try{
        let response = await TestOpcionServicio.listarTestOpciones(req, fkTestNodo, fkTestNodoSig, clave, texto, ordenarPor, ordenarModo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearTestOpcion: Handler = async (req, res, next) => {
    const TestOpcion: TestOpcion = req.swagger.params['TestOpcion'].value;
    try{
        let response = await TestOpcionServicio.crearTestOpcion(req, TestOpcion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerTestOpcion: Handler = async (req, res, next) => {
    const idTestOpcion: number = req.swagger.params['idTestOpcion'].value;
    try{
        let response = await TestOpcionServicio.obtenerTestOpcion(req, idTestOpcion);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarTestOpcion: Handler = async (req, res, next) => {
    const idTestOpcion: number = req.swagger.params['idTestOpcion'].value;
    const TestOpcion: TestOpcion = req.swagger.params['TestOpcion'].value;
    try{
        let response = await TestOpcionServicio.actualizarTestOpcion(req, idTestOpcion, TestOpcion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarTestOpcion: Handler = async (req, res, next) => {
    const idTestOpcion: number = req.swagger.params['idTestOpcion'].value;
    try{
        let response = await TestOpcionServicio.eliminarTestOpcion(req, idTestOpcion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const descargarTestOpcionArchivo: Handler = async (req, res, next) => {
    const idTestOpcion: number = req.swagger.params['idTestOpcion'].value;
    try{
        let response = await TestOpcionServicio.descargarTestOpcionArchivo(req, idTestOpcion);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const cargarTestOpcionArchivo: Handler = async (req, res, next) => {
    const idTestOpcion: number = req.swagger.params['idTestOpcion'].value;
    const archivo: any = req.swagger.params['archivo'].value;
    try{
        let response = await TestOpcionServicio.cargarTestOpcionArchivo(req, idTestOpcion, archivo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}