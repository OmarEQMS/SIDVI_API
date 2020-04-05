import dotenv from 'dotenv';
import path from 'path';
import Knex from 'knex';
import { QueryBuilder, Model } from 'objection';

import { Models } from '../'
import { DBModels, BaseModel, ModelsEnum } from '../models';
import { Connection, _Connection } from '../database';
import { Log } from '../tools';
import { Response } from '../responses';
import { Handler } from '../types';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env')});

export const ConfigureRequest: Handler = async (req, res, next) => {
    //Connection
    req.conn = Connection.getInstance();
    //Models
    req.models = DBModels;
    //Bind
    for (let key of Object.keys(req.models)) {
        let m = req.models[key] as typeof BaseModel
        req.models[key] = m.bindKnex(req.conn.knex)
    }
    //Query
    req.query = <Model extends Models.BaseModel>(model: ModelsEnum): QueryBuilder<Model> => {
        return req.conn.query<Model>(req.models[model]);
    };
    //Next Function
    next();
}

