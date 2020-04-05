import dotenv from 'dotenv'
import Knex from 'knex';
import { QueryBuilder } from 'objection';
import path from 'path';

import { Log } from '../tools';
import { BaseModel } from '../models';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env')});

export namespace _Connection {
    export type ENV = 'PRODUCTION' | 'DEVELOPMENT' | 'TESTING';
    export const ENV = {
        PRODUCTION: 'PRODUCTION' as ENV,
        DEVELOPMENT: 'DEVELOPMENT' as ENV,
    }

    export type BaseModelType = {
        query: <Model extends BaseModel>() => QueryBuilder<any>;
    }
}

export class Connection {
    public database: string;
    public knex: Knex;
    public knexConfig: Knex.Config;
    public static instance: Connection;

    static getInstance(env?: _Connection.ENV, database?: string) {
        if (!Connection.instance) {
            Connection.instance = new Connection(env, database);
        }
        return Connection.instance;
    }

    constructor(env?: _Connection.ENV, database?: string) {
        if(!env) env = process.env.NODE_ENV=='production' ? _Connection.ENV.PRODUCTION : _Connection.ENV.DEVELOPMENT;

        switch (env) {
            case _Connection.ENV.PRODUCTION:
                this.knexConfig = JSON.parse(JSON.stringify(Connection.defaultProduction()));
                break;
            case _Connection.ENV.DEVELOPMENT:
                this.knexConfig = JSON.parse(JSON.stringify(Connection.defaultDevelopment()));
                break;
        }
        
        if (process.env.KNEX_LOGGER) {
            this.knexConfig.log = {
                warn(msg: any) { Log.warn(msg); },
                error(msg: any) { Log.error(msg); },
                deprecate(msg: any) { Log.warn(msg); },
                debug(msg: any) { Log.debug(msg); }
            }
        }

        this.database = database;
        this.knex = Knex(this.knexConfig);

        if(process.env.DEGUB_KNEX_QUERY){
            this.knex.on('query', (query) => { Log.debug(query); });
        } 
    }

    public query<Model extends BaseModel>(model: _Connection.BaseModelType): QueryBuilder<Model> {
        if (this.database != null)
            return model.query().withSchema(this.database) as QueryBuilder<Model>;
        return model.query() as QueryBuilder<Model>;
    };

    static defaultDevelopment = (): Knex.Config => {
        return {
            client: 'sqlite3',
            useNullAsDefault: true,
            connection: {
                filename: path.resolve(__dirname, `${process.env.DB_NAME}.db`)
            },
            migrations: {
                directory: path.resolve(__dirname)
            },
            seeds: {
                directory: path.resolve(__dirname, '..', '..', 'test', 'seeds')
            },
            pool: {
                min: parseInt(process.env.DB_MIN_CONNS),
                max: parseInt(process.env.DB_MAX_CONNS)
            },
        };
    }

    static defaultProduction = (): Knex.Config => {
        return {
            client: 'mysql',
            connection: {
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.DB_NAME
            },
            migrations: {
                directory: path.resolve(__dirname)
            },
            seeds: {
                directory: path.resolve(__dirname, '..', '..', 'test', 'seeds')
            },
            pool: {
                min: parseInt(process.env.DB_MIN_CONNS),
                max: parseInt(process.env.DB_MAX_CONNS)
            }
        };
    }
}