import AuthService from "../service/AuthService";
import AuthServiceJWT from "../service/AuthServiceJWT";

export const authService: AuthService = new AuthServiceJWT('http://localhost:3500')
