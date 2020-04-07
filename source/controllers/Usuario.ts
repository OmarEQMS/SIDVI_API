import { Handler } from '../types';
import { Response } from '../responses';
import { UsuarioServicio } from '../services';
import { Usuario, _Usuario } from '../models';
import { Defaults, OrderModeEnum } from '../api';
import { Log } from '../tools';

export const autenticacion: Handler = async (req, res, next) => {
    const usuario: string = req.swagger.params['usuario'].value;
    const contrasena: string = req.swagger.params['contrasena'].value;
    try{ 
        let response = await UsuarioServicio.autenticacion(req, usuario, contrasena);
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
    const usuario: string = req.swagger.params['usuario'].value;
    try{
        let response = await UsuarioServicio.recuperacion(req, usuario);
        res.respond(response);
    }catch(error){
        next(error);
    }
}

export const restablecer: Handler = async (req, res, next) => {
    const token: string = req.swagger.params['token'].value;
    const usuario: string = req.swagger.params['usuario'].value;
    const nuevaContrasena: string = req.swagger.params['nuevaContrasena'].value;
    try{
        let response = await UsuarioServicio.restablecer(req, token, usuario, nuevaContrasena);
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
    const nombreCompleto: string = req.swagger.params['nombreCompleto'].value;
    const usuario: string = req.swagger.params['usuario'].value;
    const correo: string = req.swagger.params['correo'].value;
    const celular: string = req.swagger.params['celular'].value;
    const rol: _Usuario.Rol = req.swagger.params['rol'].value;
    const ordenarModo: OrderModeEnum = req.swagger.params['ordenarModo'].value || Defaults.ordenarModo;
    const ordenarPor: string = req.swagger.params['ordenarPor'].value || Usuario.idColumn;    
    const tamanoPagina: number = req.swagger.params['tamanoPagina'].value || Defaults.tamanoPagina;
    const indicePagina: number = req.swagger.params['indicePagina'].value || Defaults.indicePagina;
    try{
        let response = await UsuarioServicio.listarUsuarios(req, nombreCompleto, usuario, correo, celular, rol, ordenarPor, ordenarModo, tamanoPagina, indicePagina);
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