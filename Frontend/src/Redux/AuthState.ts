import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. Auth State - Global State
export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {

        // Take token from session storage, restore if exist:
        this.token = sessionStorage.getItem("token");

        if (this.token) { // THIS this is  the received object from class 
            const container: { user: UserModel } = jwtDecode(this.token);
            this.user = container.user;
        }
    }
}

// 2. Auth Action Type - a list of operations we can perform on the data:
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Auth Action - a single object which dispatch sends to Redux for some change:
export interface AuthAction {
    type: AuthActionType;
    payload?: string; // string because of the token,optional because logout needs np payload
}

// 4. Auth Reducer - a function which will be invoked when calling dispatch to perform the operation:
export function authReducer(currentState = new AuthState, action: AuthAction): AuthState {
    // Duplicate current state:
    const newState = { ...currentState };

    // Perform the needed operations:
    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            const jwtPayload = jwtDecode(newState.token);
            newState.user = (jwtPayload as any).user;
            sessionStorage.setItem("token", newState.token);
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }
    // Return the new state:
    return newState;
}

// 5. Auth Store - manager object from Redux library which handles the entire operations
export const authStore = createStore(authReducer);
