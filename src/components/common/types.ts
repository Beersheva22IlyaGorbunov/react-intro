export type InputResult = {
  status: StatusType
  message: string
}

export type StatusType = "error" | "success" | "warning";