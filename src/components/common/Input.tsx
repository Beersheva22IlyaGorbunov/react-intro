import React, { useState } from 'react'
import { InputResult } from './types'
import Alert from './Alert'
import "./Input.css"

type Props = {
  placeholder: string
  buttonTitle?: string
  submitFn: (inputText: string) => InputResult
  type?: string
}

const Input: React.FC<Props> = ({ placeholder, buttonTitle, submitFn, type }) => {
  const [inputText, setInputText] = useState<string>("");
  const [inputRes, setInputRes] = useState<InputResult | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  }

  const handleSubmit = (): void => {
    const res: InputResult = submitFn(inputText);
    if (res.status === "success") {
      setInputText("")
    }
    setInputRes(res);
    setTimeout(() => setInputRes(undefined), 5000);
  }
  
  return (
    <div className='input-form'>
      <input type={type ?? "text"} onKeyDown={e => e.key === "Enter" && handleSubmit()} onChange={handleInputChange} placeholder={placeholder} />
      <button onClick={handleSubmit} disabled={!inputText}>{buttonTitle ?? "Go"}</button>
      {inputRes && <Alert status={inputRes.status} message={inputRes.message} />}
    </div>
  )
}

export default Input
