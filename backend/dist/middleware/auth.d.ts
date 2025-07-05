import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
export declare const authenticateToken: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.d.ts.map