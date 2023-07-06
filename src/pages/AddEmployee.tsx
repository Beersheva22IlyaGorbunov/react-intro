import { Container, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import EmployeeForm from "../components/forms/EmployeeForm";
import { employeesService } from "../config/service-config";
import ActionResult from "../model/ActionResult";
import CodeType from "../model/CodeType";
import Employee from "../model/Employee";
import { codeActions } from "../redux/slices/CodeSlice";

const AddEmployee = () => {
  const dispatch = useDispatch();

  const handleAddEmployee = async (
    employee: Employee
  ): Promise<ActionResult> => {
    const result: ActionResult = {
      status: "error",
      message: "",
    };
    const codeMessage = {
      code: CodeType.UNKNOWN,
      message: "",
    };
    try {
      const addedEmployee = await employeesService.addEmployee(employee);
      result.status = "success";
      result.message = `Employee with id: ${addedEmployee.id} was added`;
      codeMessage.code = CodeType.OK;
      codeMessage.message = `Employee with id: ${addedEmployee.id} was added`;
    } catch (e: any) {
      if (e === "Authentication") {
        codeMessage.code = CodeType.AUTH_ERROR;
        codeMessage.message = "Can't recognize you, you need to login";
      } else {
        codeMessage.code = CodeType.SERVER_ERROR;
        codeMessage.message = e.message;
      }
    }
    dispatch(codeActions.set({ codeMsg: codeMessage }));
    return result;
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        sx={{ p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h5" mb={2}>Add employee</Typography>
        <EmployeeForm onSubmit={handleAddEmployee} />
      </Paper>
    </Container>
  );
};

export default AddEmployee;
