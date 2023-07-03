import CodeType from "../model/CodeType";
import UserData from "../model/UserData";

export type AuthState = {
  user: UserData;
};

export type AuthRole = null | (typeof roles)[number];

const roles = ["admin", "user"];

export const isRole = (role: any): boolean => roles.includes(role);

export type CodeState = {
  codeMsg: {
    code: CodeType;
    message: string;
  }
};

export type RootState = {
  authState: AuthState;
  codeState: CodeState;
};
