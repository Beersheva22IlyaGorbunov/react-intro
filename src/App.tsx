import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import React, { ReactElement, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SnackbarAlert from './components/common/SnackbarAlert'
import NavigatorDispatcher from './components/navigators/NavigatorDispatcher'
import { authService } from './config/service-config'
import CodeType from './model/CodeType'
import StatusType from './model/StatusType'
import UserData from './model/UserData'
import AddEmployee from './pages/AddEmployee'
import AgeStatistics from './pages/AgeStatistics'
import EmployeeGenerator from './pages/EmployeeGenerator'
import Employees from './pages/Employees'
import SalaryStatistics from './pages/SalaryStatistics'
import SignIn from './pages/SignIn'
import SignOut from './pages/SignOut'
import { signOut } from './redux/slices/AuthSlice'
import { codeActions } from './redux/slices/CodeSlice'
import { useAuthSelector, useCodeSelector } from './redux/store'
import { CodeState } from './redux/types'

const DEVELOPMENT_MODE = "development"

export interface MenuPoint {
  title: string
  path: string
  element: ReactElement
  order?: number
  forRoles: Array<string | null>
  isDevelopment?: boolean
}

const menuPoints: MenuPoint[] = [
  {
    title: 'Employees',
    element: <Employees />,
    order: 1,
    path: 'employees',
    forRoles: ['admin', 'user']
  },
  {
    title: 'Add employee',
    element: <AddEmployee />,
    path: 'employees/add',
    forRoles: ['admin']
  },
  {
    title: 'Age statistics',
    element: <AgeStatistics />,
    path: 'statistics/age',
    forRoles: ['admin', 'user']
  },
  {
    title: 'Salary statistics',
    element: <SalaryStatistics />,
    path: 'statistics/salary',
    forRoles: ['admin', 'user']
  },
  {
    title: 'Employee generator',
    element: <EmployeeGenerator />,
    order: 4,
    path: 'employees/generate',
    forRoles: ['admin'],
    isDevelopment: true
  },
  {
    title: 'Sign In',
    element: <SignIn />,
    order: 999,
    path: 'signin',
    forRoles: [null]
  },
  {
    title: 'Sign Out',
    element: <SignOut />,
    order: 1000,
    path: 'signout',
    forRoles: ['admin', 'user']
  }
]

function getCurrentPoints (role: string | null, mode: string): MenuPoint[] {
  const pointForMode = mode === DEVELOPMENT_MODE ? menuPoints : menuPoints.filter((point) => point.isDevelopment !== true)
  return pointForMode
    .filter((point) => point.forRoles.includes(role || null))
    .sort((a, b) => {
      let res = 0
      if (a.order && b.order) {
        res = a.order - b.order
      }
      return res
    })
}

const App: React.FC = () => {
  const auth: UserData = useAuthSelector()
  const code: CodeState = useCodeSelector()
  const dispatch = useDispatch()

  function codeProcessing ({ codeMsg }: CodeState) {
    const res: [string, StatusType] = [codeMsg.message, 'error']
    switch (codeMsg.code) {
      case CodeType.OK: {
        res[1] = 'success'
        break
      }
      case CodeType.AUTH_ERROR: {
        dispatch(signOut())
        authService.logout()
        break
      }
    }
    return res
  }

  function handleSnackbarClose () {
    dispatch(codeActions.reset())
  }

  const [alertMessage, severity] = useMemo(() => codeProcessing(code), [code])
  const currentPoints: MenuPoint[] = getCurrentPoints(
    (auth != null) ? auth.role : null,
    process.env.NODE_ENV
  )

  const theme = createTheme({
    palette: {
      background: {
        default: '#F5F5F5'
      }
    }
  })

  console.log(process.env.NODE_ENV)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<NavigatorDispatcher menuPoints={currentPoints} />}
          >
            {currentPoints.map((point, index) => (
              <Route
                key={index}
                index={point.path === ''}
                path={point.path}
                element={point.element}
              />
            ))}
            <Route
              path='*'
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      {alertMessage && (
        <SnackbarAlert
          message={{
            status: severity,
            message: alertMessage
          }}
          onClose={handleSnackbarClose}
        />
      )}
    </ThemeProvider>
  )
}

export default App
