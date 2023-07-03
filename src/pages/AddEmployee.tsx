import { Alert, Container, Paper, Snackbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import SnackbarAlert from "../components/common/SnackbarAlert";
import EmployeeForm from "../components/forms/EmployeeForm";
import { authService, employeesService } from "../config/service-config";
import ActionResult from "../model/ActionResult";
import CodeType from "../model/CodeType";
import Employee from "../model/Employee";
import { signOut } from "../redux/slices/AuthSlice";
import { codeActions } from "../redux/slices/CodeSlice";

const AddEmployee = () => {
  const [snackbarMsg, setSnackbarMsg] = React.useState<ActionResult | undefined>(undefined);
  const dispatch = useDispatch();


  const handleAddEmployee = async (
    employee: Employee
  ): Promise<ActionResult> => {
    const result: ActionResult = {
      status: "error",
      message: "",
    };
    try {
      const addedEmployee = await employeesService.addEmployee(employee);
      result.status = "success";
      result.message = `Employee with id: ${addedEmployee.id} was added`;
      dispatch(codeActions.set({codeMsg: {code: CodeType.OK, message: result.message}}))
    } catch (e: any) {
      if (e === "Authentication") {
        dispatch(codeActions.set({codeMsg: {code: CodeType.AUTH_ERROR, message: "Can't recognize you, you need to login"}}))
      } else {
        dispatch(codeActions.set({codeMsg: {code: CodeType.SERVER_ERROR, message: e.message}}))
      }
    }
    return result;
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h5" mb={2}>Add employee</Typography>
        <EmployeeForm onSubmit={handleAddEmployee} />
      </Paper>
      { snackbarMsg && <SnackbarAlert message={ snackbarMsg } />}
    </Container>
  );
};

export default AddEmployee;
