import CodeType from '../model/CodeType'
import UserData from '../model/UserData'

export interface AuthState {
  user: UserData
}

export type AuthRole = null | (typeof roles)[number]

const roles = ['admin', 'user']

export const isRole = (role: any): boolean => roles.includes(role)

export interface CodeState {
  codeMsg: {
    code: CodeType
    message: string
  }
}

export interface RootState {
  authState: AuthState
  codeState: CodeState
}
