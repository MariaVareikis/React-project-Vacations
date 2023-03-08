import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import { Request } from "express";
import RoleModel from "../4-models/role-model";
import crypto from "crypto";

// Create secret key = a string for our rest API:

const secretKey = "ChickenLittle";

function getNewToken(user: UserModel): string {

    // Never return passwords to frontend!
    delete user.password;

    // Create a container for the user object:
    const container = { user };

    // Create expiration time:
    const options = { expiresIn: "3h" };

    // Generate token:
    const token = jwt.sign(container, secretKey, options);

    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => { // To Promisify

        try {

            // Extract header:
            const header = request.header("authorization");

            // If no such header:
            if (!header) {
                resolve(false);
                return;
            }

            // Extract token from header:
            const token = header.substring(7);

            // If there is no token:
            if (!token) {
                resolve(false);
                return;
            }

            //Verify token:
            jwt.verify(token, secretKey, err => {

                // If token is illegal:
                if (err) {
                    resolve(false);
                    return;
                }

                // Here token must be legal:
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }

    });
}

const salt = "MakeThingsGoRight";

function hash(plaintext: string): string {

    if (!plaintext) return null;

    // Hash with salt:
    const hashedText = crypto.createHmac("sha512", salt).update(plaintext).digest("hex");

    return hashedText;

}

async function verifyAdmin(request: Request): Promise<boolean> {

    // First check if user logged in:
    const isLoggedIn = await verifyToken(request);

    //If not logged in:
    if (!isLoggedIn) return false;

    // Extract header:
    const header = request.header("authorization");

    //Extract token:
    const token = header.substring(7);

    // Extract container from token:
    const container: any = jwt.decode(token);

    //Extract user:
    const user: UserModel = container.user;

    //Return if user is admin, otherwise return false:
    return user.roleId === RoleModel.admin;

}

async function verifyUser(request: Request): Promise<boolean> {
    const isLoggedIn = await verifyToken(request);

    if (!isLoggedIn) return false;

    const header = request.header("authorization");
    const token = header.substring(7);

    const container: any = jwt.decode(token);

    const user: UserModel = container.user;

    return user.roleId === RoleModel.user;

}

function getUser(request: Request): UserModel {
    const header = request.header("authorization");
    const token = header.substring(7);
    const container: any = jwt.decode(token)
    const user: UserModel = container.user;
    return user;
}

export default {
    getNewToken,
    verifyToken,
    hash,
    verifyAdmin,
    verifyUser,
    getUser
};