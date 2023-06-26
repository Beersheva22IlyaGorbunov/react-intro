export type AuthState = {
  role: AuthRole
}

export type AuthRole = null | (typeof roles)[number]

const roles = ["admin", "user"]

export const isRole = (role: any): boolean => roles.includes(role)

export type RootState = {
  authState: AuthState
}