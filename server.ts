import express from 'express'
import dotenv from 'dotenv'
import * as swaggerTools from 'swagger-tools';
import * as jsyaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';
import * as http from 'http';
import cors from 'cors';

import { Log } from './source/tools';
import { ErrorHandler, Logger, PreLogger, ConfigureRequest, PreValidator, ConfigureResponse, Authorization } from './source/middleware';

//App
async function InitializeServer() {
    const app = express();
    app.disable('x-powered-by');
    dotenv.config();
    const apiSpec = JSON.parse(JSON.stringify((jsyaml.safeLoad(fs.readFileSync(path.resolve(__dirname, 'specification', 'SIDVI.yaml'), 'utf8')))));

    swaggerTools.initializeMiddleware(apiSpec, function (middleware) {
        app.use(cors());

        // Interpret Swagger resources and attach metadata (jsonParser) to request - must be first in swagger-tools middleware chain
        app.use(middleware.swaggerMetadata());

        //PreValidator
        app.use(PreValidator);

        // Validate Swagger requests
        app.use(middleware.swaggerValidator({
            schema: apiSpec,
            validateRequest: true,
            validateResponse: false,
            allowNullable: true
        } as swaggerTools.SwaggerValidatorOptions));
        
        // ConfigureRequest
        app.use(ConfigureRequest);
        app.use(ConfigureResponse);

        //Authenticate
        app.use(middleware.swaggerSecurity(Authorization));

        //Logger
        app.use(Logger);

        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter({
            controllers: path.resolve(__dirname, 'source', 'controllers')
        }));
      
        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi({ 
            apiDocs: `${process.env.BASE}${process.env.DOCS}${process.env.SPEC}`,
            swaggerUi: `${process.env.BASE}${process.env.DOCS}`
        }));

        // Handle errors midleware
        app.use(ErrorHandler);

        // Start the server
        http.createServer(app).listen(process.env.PORT, function () {
            Log.info(`Your server is listening on port ${process.env.PORT} (http://${process.env.HOST}:${process.env.API_PORT}${process.env.BASE})`);
        });
    });

}

InitializeServer()