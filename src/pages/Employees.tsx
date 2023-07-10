import React, { useState } from 'react'
import { employeesService } from '../config/service-config'
import { Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import useEmployees from '../hooks/useEmployees'
import { useAuthSelector } from '../redux/store'
import Confirmation from '../components/common/Confirmation'
import Employee from '../model/Employee'
import ActionResult from '../model/ActionResult'
import UpdateEmployeeModal from '../components/UpdateEmployeeModal'
import EmployeesTable from '../components/EmployeesTable'
import EmployeesList from '../components/EmployeesList'
import useCodeTypeDispatch from '../hooks/useCodeTypeDispatch'

const Employees: React.FC = () => {
  const employees = useEmployees()
  const userData = useAuthSelector()
  const dispatchCode = useCodeTypeDispatch()
  const theme = useTheme()
  const isPortrait = useMediaQuery(theme.breakpoints.down('sm'))
  const [employeeToUpdate, setEmployeeToUpdate] = useState<Employee | null>(
    null
  )
  const [removeEmplId, setRemoveEmplId] = useState<any>(null)

  async function deleteEmployee (id: any) {
    const successMessage = `Employee with id: ${id} was deleted`
    let error = ''
    try {
      await employeesService.deleteEmployee(id)
    } catch (e: any) {
      error = e
    }
    dispatchCode(successMessage, error)
  }

  async function handleUpdateEmployee (
    employeeToUpdate: Employee
  ): Promise<ActionResult> {
    const successMessage = `Employee with id: ${employeeToUpdate.id} was updated`
    let error = ''
    try {
      await employeesService.updateEmployee(employeeToUpdate)
    } catch (e: any) {
      error = e
    }
    dispatchCode(successMessage, error)
    return {
      status: error ? 'error' : 'success',
      message: error || successMessage
    }
  }

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Typography variant='h5' mb={2}>
          Employees
        </Typography>
        <Box sx={{ height: '73vh' }}>
          {isPortrait
            ? (
              <EmployeesList
                employees={employees}
                role={userData?.role}
                onRemoveEmplClick={setRemoveEmplId}
                onUpdateEmplClick={setEmployeeToUpdate}
              />
              )
            : (
              <EmployeesTable
                employees={employees}
                role={userData?.role}
                onRemoveEmplClick={setRemoveEmplId}
                onUpdateEmplClick={setEmployeeToUpdate}
              />
              )}
        </Box>
      </Paper>
      {(employeeToUpdate != null) && (
        <UpdateEmployeeModal
          onClose={() => setEmployeeToUpdate(null)}
          onSubmit={handleUpdateEmployee}
          employee={employeeToUpdate}
        />
      )}
      {removeEmplId && (
        <Confirmation
          title='Delete employee?'
          body={`You are going to delete employee with id: ${removeEmplId}. Are you sure?`}
          onSubmit={() => {
            deleteEmployee(removeEmplId)
            setRemoveEmplId(null)
          }}
          onCancel={() => setRemoveEmplId(null)}
        />
      )}
    </>
  )
}

export default Employees
