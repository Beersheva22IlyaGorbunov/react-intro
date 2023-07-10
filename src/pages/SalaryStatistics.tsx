import { Paper, Typography } from '@mui/material'
import Statistics from '../components/common/Statistics'
import useEmployees from '../hooks/useEmployees'
import employeeConfig from '../config/employee-config.json'

const { statistics } = employeeConfig

const SalaryStatistics = () => {
  const employees = useEmployees()

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant='h5' mb={2}>
        Salary statistics
      </Typography>
      <Statistics
        data={employees}
        statisticsField='salary'
        stepArr={statistics.salary.stepArr}
        defaultStep={statistics.salary.defaultStep}
      />
    </Paper>
  )
}

export default SalaryStatistics
