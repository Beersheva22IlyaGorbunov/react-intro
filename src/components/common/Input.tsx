import React, { useState } from 'react'
import InputResult from '../../model/ActionResult'
import './Input.css'
import { Alert, Box, TextField, Button } from '@mui/material'

interface Props {
  placeholder: string
  buttonTitle?: string
  submitFn: (inputText: string) => InputResult
  type?: string
}

const Input: React.FC<Props> = ({ placeholder, buttonTitle, submitFn, type }) => {
  const [inputText, setInputText] = useState<string>('')
  const [inputRes, setInputRes] = useState<InputResult | undefined>(undefined)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value)
  }

  const handleSubmit = (): void => {
    const res: InputResult = submitFn(inputText)
    if (res.status === 'success') {
      setInputText('')
    }
    setInputRes(res)
    setTimeout(() => setInputRes(undefined), 5000)
  }

  return (
    <div className='input-form'>
      <Box sx={{ display: 'flex', flexDirection: 'row' }} gap={1}>
        <TextField size='small' type={type ?? 'text'} label={placeholder} variant='outlined' onKeyDown={e => e.key === 'Enter' && handleSubmit()} onChange={handleInputChange} />
        <Button variant='outlined' onClick={handleSubmit} disabled={!inputText}>{buttonTitle ?? 'Go'}</Button>
      </Box>
      {(inputRes != null) && <Alert severity={inputRes.status}>{inputRes.message}</Alert>}
    </div>
  )
}

export default Input
