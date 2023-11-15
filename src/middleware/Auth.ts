

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const auth = (requiredRoles: string[]) => {
    return async (req: any, res: Response, next: NextFunction) => {
      const token: string | undefined = req.headers.authorization;
  
      if (token) {
        try {
          const decoded: any = await jwt.verify(token, process.env.JWT_SECRET || "");
  
          if (decoded) {
            req.user = decoded;
            req.userRoles = decoded.roles || [];
  
            const hasRequiredRole = req.userRoles.some((role: string) => requiredRoles.includes(role));
  
            if (!hasRequiredRole) {
              return res.status(403).json({ message: 'Insufficient permissions' });
            }
  
            next();
          } else {
            return res.status(401).send({ "msg": "Login again" });
          }
        } catch (error) {
          return res.status(401).send({ "msg": "Invalid token" });
        }
      } else {
        return res.status(404).send({ msg: "Login first" });
      }
    };
  };
  