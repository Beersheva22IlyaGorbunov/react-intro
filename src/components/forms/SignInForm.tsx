import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LoginData from '../../model/LoginData'
import ActionResult from '../../model/ActionResult'
import { useState } from 'react'
import { Alert } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Login } from '@mui/icons-material'

interface Props {
  onSignIn: (loginData: LoginData) => Promise<ActionResult>
}

export const SignInForm: React.FC<Props> = ({ onSignIn }) => {
  const [loginRes, setLoginRes] = useState<ActionResult | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    if (typeof email === 'string' && typeof password === 'string') {
      const loginData: LoginData = {
        email,
        password
      }
      const res = await onSignIn(loginData)
      setLoginRes(res)
      setIsLoading(false)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onChange={() => setLoginRes(undefined)} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <LoadingButton
            type='submit'
            fullWidth
            loading={isLoading}
            endIcon={<Login />}
            loadingPosition='end'
            variant='contained'
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          {(loginRes != null) && <Alert severity={loginRes.status}>{loginRes.message}</Alert>}
        </Box>
      </Box>
    </Container>
  )
}

export default SignInForm
