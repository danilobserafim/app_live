import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT, { SignOptions } from "jsonwebtoken";
import basicAuthenticationMiddleware from "../middlewares/basic.authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt.authentication.middleware";
import forbiddenError from "../models/errors/forbidden.error.models";


const authorizationRoute = Router()

authorizationRoute.post("/token", basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (!user) {
            throw new forbiddenError("Usuario não encontrado")
        }


        const jwtPayload = { username: user.userName }
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: "2 days" }
        const secretKey = 'my_secret_key'


        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions)
        res.status(StatusCodes.OK).json({ token: jwt })



    } catch (error) {
        next(error)
    }
})

authorizationRoute.post("/token/validate", jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK)
})

export default authorizationRoute;