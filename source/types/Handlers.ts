import { ServerRequest, ServerResponse } from '../types';

export type NextFunction = (err?: any) => void;

export type _SimpleHandler = (req: ServerRequest, res: ServerResponse) => any;
export type _Handler = (req: ServerRequest, res: ServerResponse, next: NextFunction) => any;
export type _ErrHandler = (err: any, req: ServerRequest, res: ServerResponse, next: NextFunction) => any;

export type SimpleHandler = (req: ServerRequest, res: ServerResponse) => Promise<any>;
export type Handler = (req: ServerRequest, res: ServerResponse, next: NextFunction) => Promise<any>;
export type ErrHandler = (err: any, req: ServerRequest, res: ServerResponse, next: NextFunction) => Promise<any>;
