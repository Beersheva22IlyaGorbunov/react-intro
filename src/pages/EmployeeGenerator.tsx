import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import employeesConfig from "../config/employee-config.json";
import React from "react";
import { getRandomEmployee } from "../utils/random";
import { authService, employeesService } from "../config/service-config";
import ActionResult from "../model/ActionResult";
import { signOut } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import Input from "../components/common/Input";
import SnackbarAlert from "../components/common/SnackbarAlert";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/CodeSlice";

const {
  generateMin,
  generateMax,
  departments,
  minSalary,
  maxSalary,
  minYear,
  maxYear,
  salaryStep,
} = employeesConfig;

const EmployeeGenerator = () => {
  const [quantity, setQuantity] = React.useState<number>(0);
  const [quantityError, setQuantityError] = React.useState<boolean>(false);
  const [actionResult, setActionResult] = React.useState<ActionResult | undefined>(undefined)
  const dispatch = useDispatch();

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = +e.target.value;
    if (newValue >= generateMin && newValue <= generateMax) {
      setQuantityError(false);
    } else {
      setQuantityError(true);
    }
    setQuantity(newValue);
  }

  async function handleSubmit() {
    try {
      const employees = Array.from({ length: quantity }).map(() =>
        getRandomEmployee({
          departments,
          minSalary,
          maxSalary,
          minYear,
          maxYear,
          salaryStep,
        })
      );
      const promises = employees.map((employee) =>
        employeesService.addEmployee(employee)
      );
      const responses = await Promise.all(promises);
      const message = `${responses.length} employees were added succesfully`;
      dispatch(codeActions.set({codeMsg: {code: CodeType.OK, message}}))
      setQuantity(0);
    } catch (e: any) {
      if (e === "Authentication") {
        dispatch(codeActions.set({codeMsg: {code: CodeType.AUTH_ERROR, message: "Can't recognize you, you need to login"}}))
      } else {
        dispatch(codeActions.set({codeMsg: {code: CodeType.SERVER_ERROR, message: e.message}}))
      }
    }
  }

  return (
    <Box sx={{display: "flex", justifyContent:"center"}}>
      <Paper
        sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5">Generate employees</Typography>
        <TextField
          size="small"
          fullWidth
          placeholder="Quantity of employees"
          label="Quantity of employees"
          type={"number"}
          value={quantity === 0 ? "" : quantity}
          onChange={handleQuantityChange}
          error={!!quantityError}
          helperText={`Employees quantity should be in range [${generateMin}, ${generateMax}]`}
        />
        <Button
          onClick={handleSubmit}
          disabled={quantityError || quantity === 0}
          variant="contained"
        >
          Generate
        </Button>
      </Paper>
      { actionResult && <SnackbarAlert message={actionResult} />}
    </Box>
  );
};

export default EmployeeGenerator;
