import { Response, Request, NextFunction } from 'express';
import { MiddlewareFn, AuthChecker } from 'type-graphql';
import { Context } from '../types';
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const ErrorInterceptor: MiddlewareFn<any>;
export declare const authChecker: AuthChecker<Context>;
//# sourceMappingURL=middleware.d.ts.map