import { NextFunction, Request, Response } from "express";
import forbiddenError from "../models/errors/forbidden.error.models";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers['authorization']
        if (!authorizationHeader) {
            throw new forbiddenError("Autenticação invalida");
        }

        const [authenticationType, token] = authorizationHeader.split(" ")
        if (authenticationType !== "basic" || !token) {
            throw new forbiddenError("Autenticação invalida");
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf8')
        const [userName, password] = tokenContent.split(":")
        if (!userName || !password) {
            throw new forbiddenError("Verifique suas credenciais e tente de novo");
        }

        const user = await userRepository.findUserPassword(userName, password)

        if (!user) {
            throw new forbiddenError("usuario ou senha invalidos");

        }
        req.user = user
        next()
    } catch (error) {
        next(error)
    }
}

export default basicAuthenticationMiddleware;