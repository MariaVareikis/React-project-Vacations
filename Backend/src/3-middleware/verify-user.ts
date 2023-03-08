import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedError } from "../4-models/error-models";

async function verifyUser(request: Request, response: Response, next: NextFunction) {

    try {
        const isValid = await cyber.verifyUser(request);
        if (!isValid) throw new UnauthorizedError("You are not a user!");
        next();
    }
    catch (err: any) {
        next(err);
    }

}

export default verifyUser;