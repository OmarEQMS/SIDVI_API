
export namespace _APIResponse {
    export type TypeEnum = 'ERROR' | 'SUCCESS';
    export const TypeEnum = {
        ERROR: 'ERROR' as TypeEnum,
        SUCCESS: 'SUCCESS' as TypeEnum
    };

    //Default Responses
    export const OK: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 200,
        message: 'La operación se ha realizado correctamente'
    }
    export const ACCEPTED: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 202,
        message: 'La operación se ha aceptado y se esta procesando'
    };
    export const CREATED: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 201,
        message: 'El recurso se ha creado correctamente'
    }
    export const UPDATED: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 201,
        message: 'El recurso se ha actualizado correctamente'
    }
    export const DELETED: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 204,
        message: 'El recurso se ha eliminado correctamente'
    }

    export const NO_CONTENT: IAPIResponse = {
        type: TypeEnum.SUCCESS,
        statusCode: 204,
        message: 'La operación se ha realizado correctamente'
    };
    export const BAD_REQUEST: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 400,
        message: 'No podemos procesar los datos, por favor revise los datos enviados'
    };
    export const UNAUTHORIZED: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 401,
        message: 'No esta autorizado para utilizar el sistema'
    };
    export const FORBIDDEN: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 403,
        message: 'No cuenta con los privilegios para realizar esta operación',
    };
    export const NOT_FOUND: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 404,
        message: 'El recurso solicitado no se encontró'
    };
    export const ALREADY_EXISTS: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 409,
        message: 'El recurso ya existe'
    };
    export const PRECONDITION_FAILED: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 412,
        message: 'No es posible realizar esta operación en este momento'
    };
    export const UNPROCESSABLE_ENTITY: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 422,
        message: 'No se puede realizar la operación'
    };
    export const RESOURCE_EXHAUSTED: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 409,
        message: 'El recurso se ha agotado'
    };
    export const UNHANDLED_ERROR: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 500,
        message: 'Ocurrió un problema, intente de nuevo más tarde'
    };
    export const NOT_IMPLEMENTED: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 501,
        message: 'Ocurrió un problema, intente de nuevo más tarde'
    };
    export const UNAVAILABLE: IAPIResponse = {
        type: TypeEnum.ERROR,
        statusCode: 501,
        message: 'El servicio no esta disponible, intente de nuevo más tarde'
    };
}

//Interface APIResponse
export interface IAPIResponse {
    type: _APIResponse.TypeEnum;
    statusCode: number;
    message: string;
    extra?: any;
    debugMessage?: any;
}

export class APIResponse implements IAPIResponse {
    type: _APIResponse.TypeEnum;
    statusCode: number;
    message: string;
    extra?: any;
    debugMessage?: any;

    constructor(defaultResponse:IAPIResponse, message?:string, extra?: any, debugMessage?:string) { 
        this.type = defaultResponse.type;
        this.statusCode = defaultResponse.statusCode;
        this.message = (message != undefined) ? message : defaultResponse.message;
        this.extra = (extra!=undefined) ? extra : {};
        this.debugMessage = {
            debugMessage: debugMessage,
            stack: APIResponse.CaptureStack()
        };

        if(this.type==_APIResponse.TypeEnum.SUCCESS) delete this.debugMessage.stack;
    }

    static fromError(error:Error, defaultResponse?:IAPIResponse, message?:string){
        if(defaultResponse==undefined) defaultResponse=_APIResponse.UNHANDLED_ERROR;
        if(message!=undefined) defaultResponse.message=defaultResponse.message;

        let newError = new APIResponse(defaultResponse);
        newError.debugMessage = { stack: this.CaptureStack(error) };
        return newError;
    }

    static CaptureStack(error?: Error): string {
        if(error){ return error.stack; }
        const stackObj: any = {};
        Error.captureStackTrace(stackObj);
        return stackObj.stack;
    }

}