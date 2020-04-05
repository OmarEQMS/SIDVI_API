import { wrapError, UniqueViolationError, NotNullViolationError, ForeignKeyViolationError, CheckViolationError, DataError, DBError } from 'db-errors';

import { Log } from '../tools';
import { Response, APIResponse, _APIResponse } from '../responses';
import { ErrHandler } from '../types';


export namespace ValidatorCodes {
    export type ValidatorCodes = 'SCHEMA_VALIDATION_FAILED' | 'OBJECT_MISSING_REQUIRED_PROPERTY' | 'INVALID_TYPE' | 'INVALID_FORMAT' | 'ENUM_MISMATCH' | 'ENUM_CASE_MISMATCH' | 'ANY_OF_MISSING' | 'ONE_OF_MISSING' | 'ONE_OF_MULTIPLE' | 'ARRAY_LENGTH_SHORT' | 'ARRAY_LENGTH_LONG' | 'ARRAY_UNIQUE' | 'ARRAY_ADDITIONAL_ITEMS' | 'MULTIPLE_OF' | 'MINIMUM_EXCLUSIVE' | 'MAXIMUM_EXCLUSIVE' | 'MAXIMUM' | 'MINIMUM' | 'MIN_LENGTH' | 'MAX_LENGTH' | 'PATTERN';
    export const ValidatorCodes = {
        SCHEMA_VALIDATION_FAILED: 'SCHEMA_VALIDATION_FAILED',
        OBJECT_MISSING_REQUIRED_PROPERTY: 'OBJECT_MISSING_REQUIRED_PROPERTY',
        INVALID_TYPE: 'INVALID_TYPE',
        INVALID_FORMAT: 'INVALID_FORMAT',
        ENUM_MISMATCH: 'ENUM_MISMATCH',
        ENUM_CASE_MISMATCH: 'ENUM_CASE_MISMATCH',
        ANY_OF_MISSING: 'ANY_OF_MISSING',
        ONE_OF_MISSING: 'ONE_OF_MISSING',
        ONE_OF_MULTIPLE: 'ONE_OF_MULTIPLE',
        ARRAY_LENGTH_SHORT: 'ARRAY_LENGTH_SHORT',
        ARRAY_LENGTH_LONG: 'ARRAY_LENGTH_LONG',
        ARRAY_UNIQUE: 'ARRAY_UNIQUE',
        ARRAY_ADDITIONAL_ITEMS: 'ARRAY_ADDITIONAL_ITEMS',
        MULTIPLE_OF: 'MULTIPLE_OF',
        MINIMUM_EXCLUSIVE: 'MINIMUM_EXCLUSIVE',
        MAXIMUM_EXCLUSIVE: 'MAXIMUM_EXCLUSIVE',
        MAXIMUM: 'MAXIMUM',
        MINIMUM: 'MINIMUM',
        MIN_LENGTH: 'MIN_LENGTH',
        MAX_LENGTH: 'MAX_LENGTH',
        PATTERN: 'PATTERN'
    };
}

export const ErrorHandler: ErrHandler = async (err, req, res, next) => {
    let apiError = new APIResponse(_APIResponse.UNHANDLED_ERROR)

    if (err) {
        if(err instanceof APIResponse){ // APIError
            apiError = err;
        }else if (err instanceof DBError) { //DBError (Objection)
            apiError.message = _APIResponse.UNHANDLED_ERROR.message;
            apiError.statusCode = _APIResponse.UNHANDLED_ERROR.statusCode;
            let wrappedError = wrapError(err as DBError)
            let errorMessage: string;
            if (wrappedError instanceof UniqueViolationError) {
                errorMessage = `Unique constraint ${wrappedError.constraint} failed for table ${wrappedError.table} and columns ${wrappedError.columns}`;
            } else if (wrappedError instanceof NotNullViolationError) {
                errorMessage = `Not null constraint failed for table ${wrappedError.table} and column ${wrappedError.column}`;
            } else if (wrappedError instanceof ForeignKeyViolationError) {
                errorMessage = `Foreign key constraint failed for table ${wrappedError.table} and column ${wrappedError.constraint}`;
            } else if (wrappedError instanceof CheckViolationError) {
                errorMessage = `Check violation constraint failed for table ${wrappedError.table} and column ${wrappedError.constraint}`;
            } else if (wrappedError instanceof DataError) {
                errorMessage = 'Data error';
            } else {
                errorMessage = `Some unknown DB error Error: ${wrappedError.nativeError}`;
            }
            apiError.debugMessage = {
                debugMessage: errorMessage,
                wrappedError: wrappedError
            }
        }else if (err.failedValidation) { //Swagger Validator Failed
            apiError.message = _APIResponse.BAD_REQUEST.message
            apiError.statusCode = _APIResponse.BAD_REQUEST.statusCode
            if (err.results !== undefined) {
                let missingProperties = []
                let invalidProperties = []
                let typeProperties = []
                let importantMessage = null
                for (let error of err.results.errors) {
                    let schema = error[Symbol.for('z-schema/schema')]
                    let json = error[Symbol.for('z-schema/json')]
                    let propName = error.path[error.path.length - 1]
                    let readableName = schema['x-name'] || propName
                    let value = json[propName]
                    switch (error.code) {
                        case ValidatorCodes.ValidatorCodes.OBJECT_MISSING_REQUIRED_PROPERTY:
                            missingProperties.push(error.message.split(':')[1].trim())
                            break;
                        case ValidatorCodes.ValidatorCodes.INVALID_FORMAT:
                            invalidProperties.push(readableName)
                            break;
                        case ValidatorCodes.ValidatorCodes.INVALID_TYPE:
                            typeProperties.push(readableName)
                            break;
                        case ValidatorCodes.ValidatorCodes.MAXIMUM:
                            importantMessage = `El campo: ${readableName}, tiene un valor inválido: ${value}, el valor máximo es: ${schema['maximum']}`
                            break
                        case ValidatorCodes.ValidatorCodes.MINIMUM:
                            importantMessage = `El campo: ${readableName}, tiene un valor inválido: ${value}, el valor mínimo es: ${schema['minimum']}`
                            break
                        case ValidatorCodes.ValidatorCodes.MIN_LENGTH:
                            importantMessage = `El campo: ${readableName}, tiene un valor inválido: ${value}, la longitud máxima es: ${schema['maxLength']}`
                            break
                        case ValidatorCodes.ValidatorCodes.MAX_LENGTH:
                            importantMessage = `El campo: ${readableName}, tiene un valor inválido: ${value}, la longitud mínima es: ${schema['maxLength']}`
                            break
                        case ValidatorCodes.ValidatorCodes.PATTERN:
                            importantMessage = `El campo: ${readableName}, tiene un valor inválido: ${value}`
                            break
                    }
                }
                if (importantMessage) {
                    apiError.message = importantMessage;
                } else {
                    let messages = []
                    if (missingProperties.length > 0) messages.push(`${(missingProperties.length == 1) ? 'El campo' : 'Los campos'}: ${missingProperties.join(', ')}, ${(missingProperties.length == 1) ? 'no se encuentra' : 'no se encuentran'}`)
                    if (invalidProperties.length > 0) messages.push(`${(invalidProperties.length == 1) ? 'El campo' : 'Los campos'}: ${invalidProperties.join(', ')}, tienen un formato inválido`)
                    if (typeProperties.length > 0) messages.push(`${(typeProperties.length == 1) ? 'El campo' : 'Los campos'}: ${typeProperties.join(', ')}, tienen un tipo inválido`)

                    apiError.message = `${messages.join('; ')}.`;
                }
            } else if (err.code == ValidatorCodes.ValidatorCodes.ENUM_MISMATCH) {
                let tokens = err.message.match(/\(([^\)]+)\)/g)
                let val = err.message.match(/(\)\: .*)/g)[0].replace(/(\)\: )/g, '')
                apiError.message = `El campo: ${tokens[0].replace(/[()]/g, '')}, tiene un valor incorrecto (${val}), los valores aceptados son: ${tokens[1].replace(/[()]/g, '')}`
                apiError.debugMessage = err
            } else {
                apiError.debugMessage = {
                    err: err,
                    code: err.code,
                    path: err.path,
                    paramName: err.paramName
                };
            }
        } else if (err.type == 'entity.parse.failed') { //SwaggerMetadata (jsonParser)
            apiError.message = 'Por favor envie los datos en un formato JSON correcto'
            apiError.statusCode = _APIResponse.BAD_REQUEST.statusCode
        } else { //Unexpected error
            apiError = APIResponse.fromError(err, _APIResponse.UNHANDLED_ERROR, err.message);
        }
        
        Log.error(apiError);
        Response.respond(res, apiError);
    } else {
        next()
    }
}
