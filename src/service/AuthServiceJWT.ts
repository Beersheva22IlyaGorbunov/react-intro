import LoginData from "../model/LoginData";
import UserData from "../model/UserData";
import AuthService from "./AuthService";

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
    if (response.ok) {
      const body = await response.json();
      const userInfoStr = atob(body.accessToken.split(".")[1]);
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
    return new Promise(res => res())
  }
}
