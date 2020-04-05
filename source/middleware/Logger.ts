import { Log } from '../tools';
import { Handler } from '../types';


export const Logger: Handler = async (req,res,next) => {
    if(process.env.LOGGER){
        Log.info(req.method + ' to ' + req.path);
    }
    next();
} 

export const PreLogger: Handler = async (req,res,next) => {
    if(process.env.LOGGER){
        Log.info(req.method + ' to ' + req.path);
    }
    next();
} 