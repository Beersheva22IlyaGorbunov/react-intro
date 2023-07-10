
// export const authService: AuthService = new AuthServiceJWT('https://spotless-ruby-addition.glitch.me/login')
// export const employeesService: EmployeesService = new EmployeesServiceRest('https://spotless-ruby-addition.glitch.me/employees')

import AuthService from '../service/authentication/AuthService'
import AuthServiceFirebase from '../service/authentication/AuthServiceFirebase'
import EmployeesService from '../service/crud/EmployeesService'
import EmployeesServiceFirebase from '../service/crud/EmployeesServiceFirebase'

// export const authService: AuthService = new AuthServiceJWT('http://localhost:3500/login')
// export const employeesService: EmployeesService = new EmployeesServiceRest('http://localhost:3500/employees')

export const authService: AuthService = new AuthServiceFirebase()
export const employeesService: EmployeesService = new EmployeesServiceFirebase()
