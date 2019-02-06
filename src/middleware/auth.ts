import jwt from 'jsonwebtoken'
import config from 'config'
import { Request } from "express";
import { Response } from "express-serve-static-core";
import { NextFunction } from "connect";
import App from '../App'

export default (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('x-auth-token')
        if (!token) return res.status(401).send({ errorMsg: 'Access denied. Authorization required.'})
        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
            App.logger.debug("Auth Token:", JSON.stringify(decoded))
            res.locals.authData = decoded //recommended way of passing data through middleware call stack
            next()
        }
        catch (error) {
            res.status(400).send({ errorMsg: 'Invalid token.' })
        }
}
