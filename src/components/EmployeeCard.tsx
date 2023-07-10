import React from 'react'
import Employee from '../model/Employee'
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material'

interface Props {
  employee: Employee
  role: string | undefined
  onRemoveEmplClick: (id: number) => void
  onUpdateEmplClick: (employee: Employee) => void
}

const EmployeeCard: React.FC<Props> = ({
  employee,
  role,
  onRemoveEmplClick,
  onUpdateEmplClick
}) => {
  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={<Avatar>{employee.name[0]}</Avatar>}
        title={employee.name}
        subheader={employee.department}
        sx={{ pb: 0 }}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          Gender: {employee.gender}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Salary: {employee.salary}₪
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Birthdate: {employee.birthDate.toDateString()}
        </Typography>
      </CardContent>
      {role === 'admin' && <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Button
          onClick={() => onRemoveEmplClick(employee.id)}
          size='small'
          variant='outlined'
          color='error'
        >
          Delete
        </Button>
        <Button
          onClick={() => onUpdateEmplClick(employee)}
          size='small'
          variant='outlined'
          color='warning'
        >
          Edit
        </Button>
      </CardActions>}
    </Card>
  )
}

export default EmployeeCard
