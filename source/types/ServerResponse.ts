import { Response as ExpressResponse } from 'express';

import { EncodingEnum, ContentTypeEnum } from '../api';

export interface ServerResponse extends ExpressResponse {
    respond?: <Type>(content: Type, code?:number, contentType?: ContentTypeEnum, encoding?: EncodingEnum) => void;
}