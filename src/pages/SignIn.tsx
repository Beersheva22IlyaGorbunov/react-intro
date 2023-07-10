import { Box, Button, Divider, Stack } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import SignInForm from '../components/forms/SignInForm'
import { authService } from '../config/service-config'
import ActionResult from '../model/ActionResult'
import LoginData from '../model/LoginData'
import UserData from '../model/UserData'
import { signIn } from '../redux/slices/AuthSlice'
import servicesConfig from '../config/auth-services.json'
import { Facebook, Google } from '@mui/icons-material'

const { services } = servicesConfig

interface AuthServiceButton {
  service: string
  button: JSX.Element
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch()

  const servicesButtons: AuthServiceButton[] = [
    {
      service: 'Google',
      button: (
        <Button
          onClick={async () => await loginFn({ email: 'GOOGLE', password: '' })}
          fullWidth
          key='Google'
          variant='outlined'
          startIcon={<Google />}
        >
          Google
        </Button>
      )
    },
    {
      service: 'Facebook',
      button: (
        <Button
          onClick={async () => await loginFn({ email: 'FACEBOOK', password: '' })}
          fullWidth
          key='Facebook'
          variant='outlined'
          startIcon={<Facebook />}
        >
          Facebook
        </Button>
      )
    }
  ]

  async function loginFn (loginData: LoginData): Promise<ActionResult> {
    const result: ActionResult = {
      status: 'error',
      message: ''
    }
    let loginRes: UserData = null
    try {
      loginRes = await authService.login(loginData)
    } catch (e) {
      result.message = (e as Error).message
    }
    if (loginRes !== null) {
      dispatch(signIn(loginRes))
    }
    return result
  }

  return (
    <Box display='flex' flexDirection='column' alignItems='center'>
      <Box width='sx'>
        <SignInForm onSignIn={loginFn} />
        <Divider sx={{ mb: 2 }}>OR</Divider>
        <Stack sx={{ width: '50%', marginX: 'auto' }} spacing={1}>
          {servicesButtons
            .filter((item) => services.includes(item.service))
            .map((service) => service.button)}
        </Stack>
      </Box>
    </Box>
  )
}

export default SignIn
