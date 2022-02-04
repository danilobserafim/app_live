import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const statusRouter = Router()

statusRouter.get("/status", (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send("<h1>Rota de STATUS</h1>")
});

export default statusRouter;