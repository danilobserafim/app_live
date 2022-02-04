import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import jwtAuthenticationMiddleware from "./middlewares/jwt.authentication.middleware";
import authorizationRoute from "./routes/authorization.route";
import statusRouter from "./routes/status.route";
import usersRouter from "./routes/user.route";

const app = express()
//Configurações da aplicação
app.use(express.json())
//Configurações de rotas
app.use(statusRouter)
app.use(jwtAuthenticationMiddleware, usersRouter) 
app.use(authorizationRoute)

//Configuração dos handler e Errors
app.use(errorHandler)

//Inicialização do servidor
app.listen(3000, () => {
    console.log("Tudo funcionando na porta 3000");

})