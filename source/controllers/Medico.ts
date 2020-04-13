import { Handler } from '../types';
import { Response } from '../responses';
import { MedicoServicio } from '../services';
import { Medico, _Medico } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarMedicos: Handler = async (req, res, next) => {
    const fkUsuario: number = req.swagger.params['fkUsuario'].value;
    const fkUbicacion: number[] = req.swagger.params['fkUbicacion'].value;
    const nombreConsultorio: string = req.swagger.params['nombreConsultorio'].value;
    const nombreDoctor: string = req.swagger.params['nombreDoctor'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Medico.idColumn; 
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    try{
        let response = await MedicoServicio.listarMedicos(req, fkUsuario, fkUbicacion, nombreConsultorio, nombreDoctor, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearMedico: Handler = async (req, res, next) => {
    const medico: Medico = req.swagger.params['Medico'].value;
    try{
        let response = await MedicoServicio.crearMedico(req, medico);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerMedico: Handler = async (req, res, next) => {
    const idMedico: number = req.swagger.params['idMedico'].value;
    try{
        let response = await MedicoServicio.obtenerMedico(req, idMedico);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarMedico: Handler = async (req, res, next) => {
    const idMedico: number = req.swagger.params['idMedico'].value;
    const medico: Medico = req.swagger.params['Medico'].value;
    try{
        let response = await MedicoServicio.actualizarMedico(req, idMedico, medico);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarMedico: Handler = async (req, res, next) => {
    const idMedico: number = req.swagger.params['idMedico'].value;
    try{
        let response = await MedicoServicio.eliminarMedico(req, idMedico);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const descargarMedicoFoto: Handler = async (req, res, next) => {
    const idMedico: number = req.swagger.params['idMedico'].value;
    try{
        let response = await MedicoServicio.descargarMedicoFoto(req, idMedico);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const cargarMedicoFoto: Handler = async (req, res, next) => {
    const idMedico: number = req.swagger.params['idMedico'].value;
    const foto: any = req.swagger.params['foto'].value;
    try{
        let response = await MedicoServicio.cargarMedicoFoto(req, idMedico, foto);
        res.respond(response);
    }catch(error){
        next(error);
    }
}