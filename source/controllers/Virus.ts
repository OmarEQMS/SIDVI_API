import { Handler } from '../types';
import { Response } from '../responses';
import { UsuarioServicio } from '../services';
import { Usuario, _Usuario } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const listarUsuarios: Handler = async (req, res, next) => {
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Usuario.idColumn;    
    try{
        let response = await UsuarioServicio.listarUsuarios(req, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const crearUsuario: Handler = async (req, res, next) => {
    const usuario: Usuario = req.swagger.params['usuario'].value;
    try{
        let response = await UsuarioServicio.crearUsuario(req, usuario);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const obtenerUsuario: Handler = async (req, res, next) => {
    const idUsuario: number = req.swagger.params['idUsuario'].value;
    try{
        let response = await UsuarioServicio.obtenerUsuario(req, idUsuario);
        res.respond(response);
        }catch(error){
        next(error);
    }
}


export const actualizarUsuario: Handler = async (req, res, next) => {
    const idUsuario: number = req.swagger.params['idUsuario'].value;
    const usuario: Usuario = req.swagger.params['usuario'].value;
    try{
        let response = await UsuarioServicio.actualizarUsuario(req, idUsuario, usuario);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const eliminarUsuario: Handler = async (req, res, next) => {
    const idUsuario: number = req.swagger.params['idUsuario'].value;
    try{
        let response = await UsuarioServicio.eliminarUsuario(req, idUsuario);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const descargarUsuarioFoto: Handler = async (req, res, next) => {
    const idUsuario: number = req.swagger.params['idUsuario'].value;
    try{
        let response = await UsuarioServicio.descargarUsuarioFoto(req, idUsuario);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const cargarUsuarioFoto: Handler = async (req, res, next) => {
    const idUsuario: number = req.swagger.params['idUsuario'].value;
    const foto: any = req.swagger.params['foto'].value;
    try{
        let response = await UsuarioServicio.cargarUsuarioFoto(req, idUsuario, foto);
        res.respond(response);
    }catch(error){
        next(error);
    }
}