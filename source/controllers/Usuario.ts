import { Handler } from '../types';
import { Response } from '../responses';
import { UsuarioServicio } from '../services';
import { Usuario, _Usuario } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const autenticacion: Handler = async (req, res, next) => {
    const matricula: string = req.swagger.params['matricula'].value;
    const contrasena: string = req.swagger.params['contrasena'].value;
    try{ 
        let response = await UsuarioServicio.autenticacion(req, matricula, contrasena);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const cerrarSesion: Handler = async (req, res, next) => {
    try{
        let response = await UsuarioServicio.cerrarSesion(req);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const recuperacion: Handler = async (req, res, next) => {
    const matricula: string = req.swagger.params['matricula'].value;
    try{
        let response = await UsuarioServicio.recuperacion(req, matricula);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const restablecer: Handler = async (req, res, next) => {
    const token: string = req.swagger.params['token'].value;
    const matricula: string = req.swagger.params['matricula'].value;
    const nuevaContrasena: string = req.swagger.params['nuevaContrasena'].value;
    try{
        let response = await UsuarioServicio.restablecer(req, token, matricula, nuevaContrasena);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const cambiarContrasena: Handler = async (req, res, next) => {
    const usuario: string = req.swagger.params['usuario'].value;
    const contrasena: string = req.swagger.params['contrasena'].value;
    const nuevaContrasena: string = req.swagger.params['nuevaContrasena'].value;
    try{
        let response = await UsuarioServicio.cambiarContrasena(req, usuario, contrasena, nuevaContrasena);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const listarUsuarios: Handler = async (req, res, next) => {
    const nombre: string = req.swagger.params['nombre'].value;
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