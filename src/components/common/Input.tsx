import React, { useState } from 'react'
import InputResult from '../../model/common/InputResultType'
import Alert from './Alert'

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
    <div>
      <input type={type ?? "text"} value={inputText} onChange={handleInputChange} placeholder={placeholder} />
      <button onClick={handleSubmit} disabled={!inputText}>{buttonTitle ?? "Go"}</button>
      {inputRes && <Alert status={inputRes.status} message={inputRes.message} />}
    </div>
  )
}

export default Input
