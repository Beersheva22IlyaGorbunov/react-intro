import { Container, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import EmployeeForm from "../components/forms/EmployeeForm";
import { employeesService } from "../config/service-config";
import ActionResult from "../model/ActionResult";
import CodeType from "../model/CodeType";
import Employee from "../model/Employee";
import { codeActions } from "../redux/slices/CodeSlice";
import useCodeTypeDispatch from "../hooks/useCodeTypeDispatch";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const dispatchCode = useCodeTypeDispatch();

  const handleAddEmployee = async (
    employee: Employee
  ): Promise<ActionResult> => {
    const result: ActionResult = {
      status: "error",
      message: "",
    };
    let error = "";
    try {
      const addedEmployee = await employeesService.addEmployee(employee);
      result.status = "success";
      result.message = `Employee with id: ${addedEmployee.id} was added`;
    } catch (e: any) {
      error = e;
    }
    dispatchCode(result.message, error);
    return result;
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h5" mb={2}>
          Add employee
        </Typography>
        <EmployeeForm onSubmit={handleAddEmployee} />
      </Paper>
    </Container>
  );
};

export default AddEmployee;
