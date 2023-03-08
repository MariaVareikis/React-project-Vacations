import { NextFunction, Request, Response } from "express";
import stripTags from "striptags";

// Sanitize tags from request body:
function sanitize(err: any, request: Request, response: Response, next: NextFunction) {

    // Run on request.body object:
    for (const prop in request.body) {

        // If property is string:
        if (typeof request.body[prop] === "string") {

            //Strip tags if exists:
            request.body[prop] = stripTags(request.body[prop]);
        }
    }

    next();
}

export default sanitize;