import React, { useState } from "react";
import { employeesService } from "../config/service-config";
import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import useEmployees from "../hooks/useEmployees";
import { useAuthSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { codeActions } from "../redux/slices/CodeSlice";
import CodeType from "../model/CodeType";
import Confirmation from "../components/common/Confirmation";
import Employee from "../model/Employee";
import ActionResult from "../model/ActionResult";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal";
import EmployeesTable from "../components/EmployeesTable";
import EmployeesList from "../components/EmployeesList";

const Employees: React.FC = () => {
  const employees = useEmployees();
  const userData = useAuthSelector();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isPortrait = useMediaQuery(theme.breakpoints.down("sm"));
  const [employeeToUpdate, setEmployeeToUpdate] = useState<Employee | null>(
    null
  );
  const [removeEmplId, setRemoveEmplId] = useState<number | null>(null);

  async function deleteEmployee(id: any) {
    const codeMessage = {
      code: CodeType.UNKNOWN,
      message: "",
    };
    try {
      await employeesService.deleteEmployee(id);
      codeMessage.code = CodeType.OK;
      codeMessage.message = `Employee with id ${id} was deleted`;
    } catch (errMsg) {
      console.log(errMsg);
      if (errMsg === "Authentication") {
        codeMessage.code = CodeType.AUTH_ERROR;
        codeMessage.message = "Can't recognize you, you need to login";
      } else if (errMsg === "Not found") {
        codeMessage.code = CodeType.NOT_FOUND;
        codeMessage.message = `Employee with id ${id} doesn't exist`;
      }
    }
    dispatch(codeActions.set({ codeMsg: codeMessage }));
  }

  async function handleUpdateEmployee(
    employeeToUpdate: Employee
  ): Promise<ActionResult> {
    const result: ActionResult = {
      status: "error",
      message: "",
    };
    const codeMessage = {
      code: CodeType.UNKNOWN,
      message: "",
    };
    try {
      const updatedEmployee = await employeesService.updateEmployee(
        employeeToUpdate
      );
      result.status = "success";
      result.message = `Employee with id: ${updatedEmployee.id} was updated`;
      codeMessage.code = CodeType.OK;
      codeMessage.message = `Employee with id: ${updatedEmployee.id} was updated`;
    } catch (e: any) {
      if (e === "Authentication") {
        codeMessage.code = CodeType.AUTH_ERROR;
        codeMessage.message = "Can't recognize you, you need to login";
      } else if (e === "Not found") {
        codeMessage.code = CodeType.NOT_FOUND;
        codeMessage.message = `Can't find employee with id: ${employeeToUpdate.id} `;
      } else {
        codeMessage.code = CodeType.SERVER_ERROR;
        codeMessage.message = e.message;
      }
    }
    dispatch(codeActions.set({ codeMsg: codeMessage }));
    return result;
  }

  return (
    <>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          Employees
        </Typography>
        <Box sx={{ height: "70vh" }}>
          {isPortrait ? (
            <EmployeesList
              employees={employees}
              role={userData?.role}
              onRemoveEmplClick={setRemoveEmplId}
              onUpdateEmplClick={setEmployeeToUpdate}
            />
          ) : (
            <EmployeesTable
              employees={employees}
              role={userData?.role}
              onRemoveEmplClick={setRemoveEmplId}
              onUpdateEmplClick={setEmployeeToUpdate}
            />
          )}
        </Box>
      </Paper>
      {employeeToUpdate && (
        <UpdateEmployeeModal
          onClose={() => setEmployeeToUpdate(null)}
          onSubmit={handleUpdateEmployee}
          employee={employeeToUpdate}
        />
      )}
      {removeEmplId && (
        <Confirmation
          title={"Delete employee?"}
          body={`You are going to delete employee with id: ${removeEmplId}. Are you sure?`}
          onSubmit={() => {
            deleteEmployee(removeEmplId);
            setRemoveEmplId(null);
          }}
          onCancel={() => setRemoveEmplId(null)}
        />
      )}
    </>
  );
};

export default Employees;
