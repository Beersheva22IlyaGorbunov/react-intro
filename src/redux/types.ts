import UserData from "../model/UserData"

export type AuthState = {
  user: UserData
}

export type AuthRole = null | (typeof roles)[number]

const roles = ["admin", "user"]

export const isRole = (role: any): boolean => roles.includes(role)

export type RootState = {
  authState: AuthState
}