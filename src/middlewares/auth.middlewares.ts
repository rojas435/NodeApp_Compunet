import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth =  (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.header('Authorization') || '';
    if(!token){
        res.status(401).json({message: 'User not authorized'});
        return;
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.body.longgedUser = decoded.user;
        req.params.id = decoded.user.id;
        next();
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            res.status(401).json({message: 'Token expired'});
            return;
        }
    }
    
}

