import { Request as ExpressRequest} from 'express';
import { Swagger20Request } from 'swagger-tools';
import { QueryBuilder } from 'objection';

import { DBModels, BaseModel, ModelsEnum } from '../models';
import { Connection } from '../database';
import { Token } from '../models/Token';

export interface ServerRequest extends ExpressRequest{
    conn?: Connection;
    models?: DBModels;
    swagger?: any;
    usuarioToken?: Token;
    query<Model extends BaseModel>(model: ModelsEnum): QueryBuilder<Model>;
}