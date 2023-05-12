import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request } from 'express';

interface ExpandRequest extends Request {
  uid: string;
}

/**
 * 解密token,拿到uid,放在req请求体里边
 */
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: ExpandRequest, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization.replace('Bearer', '').trim();
    if (!token) {
      next();
      return;
    }
    try {
      const payload = this.jwtService.verify(token, {});
      req.uid = payload.sub;
      next();
    } catch (error) {
      next();
    }
  }
}
