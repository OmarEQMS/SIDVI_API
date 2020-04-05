import { Response, _APIResponse, APIResponse } from '../responses';
import { Utils, Log } from '../tools';
import { Handler } from '../types';

export const PreValidator: Handler = async (req, res, next) => {
    if(req.swagger === undefined && !req.path.includes(process.env.DOCS)){
        let error = new APIResponse(_APIResponse.NOT_FOUND, 'No se encontró el recurso solicitado')
        Response.respond(res, error);
        return;
    }
    // Delete any null value TODO
    req.body = Utils.deleteDeepNulls(req.body)
    next()
}