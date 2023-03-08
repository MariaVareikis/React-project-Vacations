import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import vacationsController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import followersController from "./6-controllers/followers-controller";
import sanitize from "./3-middleware/sanitize";
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";

// Create express server:
const server = express();

// Defend against DoS attack:
server.use("/api/", expressRateLimit({
    max: 50, // Maximum requests per same client.
    windowMs: 1000, // Time window to allow the max requests.
    message: "Are you a hacker?" // When performing more request - return this message.
}));

// Helmet defense against malicious headers:
server.use(helmet({
    crossOriginResourcePolicy: false,
}));

// Limit CORS policy to our front end if data is not public to all world:
server.use(cors({ origin: appConfig.frontendUrl }));

// Tall express to take JSON resides in request's body into request.body object:
server.use(express.json());

// Sanitize request.body - remove HTML and script tags:
server.use(sanitize);

// Integrate express-fileupload middleware to handle uploaded files:
server.use(expressFileUpload());

//Binding our middleware:

// Tell the server to listen on any router written in our controller:
server.use("/api", authController);
server.use("/api", vacationsController);
server.use("/api", followersController);

// Route not found middleware:
server.use("*", routeNotFound);

// Catch all middleware:
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

