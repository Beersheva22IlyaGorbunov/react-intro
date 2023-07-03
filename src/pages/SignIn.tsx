import { Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import SignInForm from '../components/forms/SignInForm'
import { authService } from '../config/service-config'
import ActionResult from '../model/ActionResult'
import LoginData from '../model/LoginData'
import UserData from '../model/UserData'
import { signIn } from '../redux/slices/AuthSlice'

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  async function loginFn(loginData: LoginData): Promise<ActionResult> {
    const result: ActionResult = {
      status: "error",
      message: ""
    }
    let loginRes: UserData = null;
    try {
      loginRes = await authService.login(loginData);
    } catch (e) {
      result.message = (e as Error).message
    }
    if (loginRes !== null) {
      dispatch(signIn(loginRes))
    }
    return result;
  }

  return (
    <Box>
      <SignInForm onSignIn={loginFn}/>
    </Box>
  )
}

export default SignIn
