import LoginData from "../model/LoginData";
import UserData from "../model/UserData";
import AuthService from "./AuthService";

export const AUTH_DATA_JWT = 'auth-data-jwt';

export default class AuthServiceJWT implements AuthService {
  constructor(private url: string) {}

  async login(loginData: LoginData): Promise<UserData> {
    let result: UserData = null;
    const response = await fetch(`${this.url}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(loginData),
    });
    console.log(response)
    if (response.ok) {
      const body = await response.json();
      const jwt_token = body.accessToken;
      window.localStorage.setItem(AUTH_DATA_JWT, jwt_token);
      const userInfoStr = atob(jwt_token.split(".")[1]);
      const userInfo = JSON.parse(userInfoStr);
      result = {
        email: userInfo.email,
        role: userInfo.sub
      };
    } else {
      throw new Error("Wrong credentials");
    }
    return result;
  }

  async logout(): Promise<void> {
    window.localStorage.removeItem(AUTH_DATA_JWT);
  }
}
