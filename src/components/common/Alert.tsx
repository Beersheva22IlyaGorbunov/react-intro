import React, { CSSProperties } from 'react'
import { StatusType } from './types'

type Props = {
  status: StatusType;
  message: string;
}

const statusesMap: Map<StatusType, CSSProperties> = new Map([
  ["error", {
    backgroundColor: "red"
  }],
  ["warning", {
    backgroundColor: "yellow"
  }],
  ["success", {
    backgroundColor: "green"
  }]
])

const Alert: React.FC<Props> = ({ status, message }) => {
  return (
    <p style={statusesMap.get(status)}>
      {message}
    </p>
  )
}

export default Alert