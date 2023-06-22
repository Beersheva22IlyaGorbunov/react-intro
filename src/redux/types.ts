export type AuthState = {
  auth: null | "admin" | "user"
}

export type AuthRoles = null | "admin" | "user"

export type RootState = {
  authSlice: AuthState
}