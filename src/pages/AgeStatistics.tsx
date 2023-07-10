import { Paper, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import Statistics from '../components/common/Statistics'
import useEmployees from '../hooks/useEmployees'
import Employee from '../model/Employee'
import employeeConfig from '../config/employee-config.json'

const { statistics } = employeeConfig

type EmployeeWithAge = Employee & { age: number }

const AgeStatistics = () => {
  const employees = useEmployees()

  const employeesWithAge: EmployeeWithAge[] = useMemo(() => employees.map((empl) => ({
    ...empl,
    age: dayjs().diff(dayjs(empl.birthDate), 'year')
  })), [employees])

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h5' mb={2}>
        Age statistics
      </Typography>
      <Statistics
        data={employeesWithAge}
        statisticsField='age'
        stepArr={statistics.age.stepArr}
        defaultStep={statistics.age.defaultStep}
      />
    </Paper>
  )
}

export default AgeStatistics
