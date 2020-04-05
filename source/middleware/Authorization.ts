import jwt from 'jsonwebtoken';

import { Log } from "../tools";
import { ServerRequest, NextFunction } from "../types";
import { Token } from '../models/Token';
import { Usuario, _Usuario } from '../models';
import { APIResponse, _APIResponse } from '../responses';
import { Defaults } from '../api';

export var Authorization = {
    TokenUsuario: async function (req: ServerRequest, authOrSecDef: any, scopesOrApiKey: any, next: NextFunction) {
        if (process.env.DISABLE_SECURITY) { next(); return; }
        try{
            let token = scopesOrApiKey;
            if(token==null && req.swagger.operation['x-security'].some(scope => scope==Defaults.pathUser)) { token = req.swagger.params['TokenUsuario'].value; }
            if(token==null){                
                if(req.swagger.operation['x-security'].some(scope => scope==Defaults.anyUser)){ next(); return; }
                else throw -1;
            }
            let tokenDecoded: Token = jwt.decode(token);
            if(!req.swagger.operation['x-security'].some(scope => scope==tokenDecoded.rol)) throw -1;
            req.usuarioToken = tokenDecoded;
            let usuario = await req.query<Usuario>('Usuario').modify('authorizationSelect').findById(tokenDecoded.idUsuario); 
            await jwt.verify(token, usuario.token);
            next();
        }catch (err){
            next(new APIResponse(_APIResponse.FORBIDDEN));
        }        
        return;
    }
}
