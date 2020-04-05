import { Connection } from '../database';

export var development = Connection.defaultDevelopment();
export var production = Connection.defaultProduction();
