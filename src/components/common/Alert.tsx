import React, { CSSProperties } from 'react'
import StatusType from '../../model/StatusType';

type Props = {
  status: StatusType;
  message: string;
}

const statusesMap: Map<StatusType, CSSProperties> = new Map([
  ["error", {
    backgroundColor: "#FF5C5C"
  }],
  ["warning", {
    backgroundColor: "yellow"
  }],
  ["success", {
    backgroundColor: "#03C04A"
  }]
])

const Alert: React.FC<Props> = ({ status, message }) => {
  return (
    <p style={{
        ...statusesMap.get(status),
        padding: ".3rem .6rem"
      }}>
      {message}
    </p>
  )
}

export default Alert