import dotenv from 'dotenv';
import path from 'path';
import Knex from 'knex';

import { Models } from '../'

import { Log } from '../tools';
import { Response } from '../responses';
import { Handler } from '../types';
import { EncodingEnum, ContentTypeEnum } from '../api';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env')});

export const ConfigureResponse: Handler = async (req, res, next) => {
    res.respond = <Type>(content: Type, code?: number, contentType?: ContentTypeEnum, encoding?: EncodingEnum) => {
        Response.respond<Type>(res, content, code, contentType, encoding);
    }
    
    next();
}
