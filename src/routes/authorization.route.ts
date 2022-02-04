import { NextFunction, Request, Response, Router } from "express";

import JWT from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic.authentication.middleware";
import forbiddenError from "../models/errors/forbidden.error.models";

const authorization = Router()
authorization.post("/token",basicAuthenticationMiddleware,async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            throw new forbiddenError("Usuario não encontrado")
        }

        
        const jwtPayload = {userName: user.userName}
        const jwtOptions = {subject: user?.uuid}
        const secretKey = 'my_secret_key'


        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)
        res.status(StatusCodes.OK).json({token: jwt})
        
        
        
    } catch (error) {
        next(error)
    }
})

export default authorization;