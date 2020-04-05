import dotenv from 'dotenv';
import path from 'path';
import mime from 'mime-types';

import { Utils, Log } from '../tools';
import { APIResponse, _APIResponse } from '../responses';
import { ServerResponse } from '../types';
import { EncodingEnum, Defaults, ContentTypeEnum } from '../api';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env')});

//Response
export class IResponse {
    statusCode: number;
    contentType: string;
    encoding: string;
    content: any;
}
export class Response<Type> implements IResponse{
    statusCode: number;
    contentType: ContentTypeEnum;
    encoding: EncodingEnum;
    content: Type;

    constructor(content: Type, statusCode?:number, contentType?: ContentTypeEnum, encoding?: EncodingEnum) {
        if(content instanceof Response){
            statusCode = content['statusCode'];
            contentType = content['contentType']; 
            encoding = content['encoding']; 
            content = content['content'];
        }
        if(content instanceof APIResponse) statusCode = content['responseCode'];

        statusCode = statusCode || Defaults.DefaultResponse.statusCode;
        contentType = contentType || Defaults.contentType;             
        if(!mime.contentType(contentType)) throw new APIResponse(_APIResponse.UNHANDLED_ERROR, 'Content-Type no valido');
        if(!encoding && content instanceof ArrayBuffer) encoding = EncodingEnum.BINARY;
        encoding = encoding || Defaults.encoding;

        this.statusCode = statusCode;
        this.contentType = contentType;
        this.encoding = encoding;
        this.content = content;
    }

    public respond (res:ServerResponse) {
        //Prepare Response
        if(!process.env.DEBUG_MESSAGE_RESPONSE && this.content.hasOwnProperty('debugMessage')) delete this.content['debugMessage'];      
        if (this.contentType === 'application/json') this.content = Utils.deleteDeepNulls(this.content);
        //Response Head
        res.writeHead(this.statusCode, { 'Content-Type': this.contentType });
        //Response
        if (this.contentType === 'application/json') 
            res.write(JSON.stringify(this.content), this.encoding);
        else 
            res.write(this.content, this.encoding);
        res.end();
    }

    public static respond <Type>(res: ServerResponse, content: Type, code?:number, contentType?: ContentTypeEnum, encoding?: EncodingEnum){
        new Response(content, code, contentType, encoding).respond(res);
    }

}
