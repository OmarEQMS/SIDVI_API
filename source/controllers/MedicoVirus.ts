import { Handler } from '../types';
import { Response } from '../responses';
import { MedicoVirusServicio } from '../services';
import { MedicoVirus, _MedicoVirus } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarMedicoViruss: Handler = async (req, res, next) => {
    const fkMedico: number = req.swagger.params['fkMedico'].value;
    const fkVirus: number = req.swagger.params['fkVirus'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || MedicoVirus.idColumn;    
    try{
        let response = await MedicoVirusServicio.listarMedicosVirus(req, fkMedico, fkVirus, ordenarPor, ordenarModo);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearMedicoVirus: Handler = async (req, res, next) => {
    const medicoVirus: MedicoVirus = req.swagger.params['medicoVirus'].value;
    try{
        let response = await MedicoVirusServicio.crearMedicoVirus(req, medicoVirus);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerMedicoVirus: Handler = async (req, res, next) => {
    const idMedicoVirus: number = req.swagger.params['idMedicoVirus'].value;
    try{
        let response = await MedicoVirusServicio.obtenerMedicoVirus(req, idMedicoVirus);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarMedicoVirus: Handler = async (req, res, next) => {
    const idMedicoVirus: number = req.swagger.params['idMedicoVirus'].value;
    const medicoVirus: MedicoVirus = req.swagger.params['medicoVirus'].value;
    try{
        let response = await MedicoVirusServicio.actualizarMedicoVirus(req, idMedicoVirus, medicoVirus);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarMedicoVirus: Handler = async (req, res, next) => {
    const idMedicoVirus: number = req.swagger.params['idMedicoVirus'].value;
    try{
        let response = await MedicoVirusServicio.eliminarMedicoVirus(req, idMedicoVirus);
        res.respond(response);
    }catch(error){
        next(error);
    }
}
