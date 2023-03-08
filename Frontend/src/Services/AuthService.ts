import axios from "axios";
import jwtDecode from "jwt-decode";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/Config";

class AuthService {
    // Registering a new user:
    public async register(user: UserModel): Promise<void> {

        // Send to backend the new user:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Backend returns token:
        const token = response.data;

        // Send token to Redux:
        authStore.dispatch({ type: AuthActionType.Register, payload: token });

    }

    // Login existing user:
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send to backend the credentials:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Backend returns token:
        const token = response.data;

        // Send token to Redux:
        authStore.dispatch({ type: AuthActionType.Login, payload: token });

    }

    // Logout existing user:
    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

    // Get user iв from token:
    public async getUserIdFromToken(): Promise<number> {
        const token = authStore.getState().token;
        if (!token) { return 0 };
        const decodedToken = await jwtDecode(token);
        const userId = Promise.resolve((decodedToken as any).user.userId);
        return userId;
    }

    // Get one user:
    public async getOneUser(id: number): Promise<UserModel> {
        const response = await axios.get<UserModel>(appConfig.usersUrl + id);
        const user = response.data;
        return user;
    }

    // Is admin:
    public async isAdmin(): Promise<boolean> {
        const userId = await this.getUserIdFromToken();
        if (userId === 0) return false;
        const user = this.getOneUser(userId);
        const role = (await user).roleId;
        if (role === 1) return true;
        return false;
    }

}

const authService = new AuthService();
export default authService;