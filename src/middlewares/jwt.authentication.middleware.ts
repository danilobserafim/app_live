import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import forbiddenError from "../models/errors/forbidden.error.models";



async function jwtAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization']

        if (!authorizationHeader) {
            throw new forbiddenError("Autenticação invalida");
        }
        const [authenticationType, token] = authorizationHeader.split(" ")
        if (authenticationType !== "Bearer" || !token) {
            throw new forbiddenError("Autenticação invalida");
        }

        const tokenPayload = JWT.verify(token, 'my_secret_key')

        if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
            throw new forbiddenError("Usuario não encontrado");
        }
        const user = { uuid: tokenPayload.sub, username: tokenPayload.username }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

export default jwtAuthenticationMiddleware;