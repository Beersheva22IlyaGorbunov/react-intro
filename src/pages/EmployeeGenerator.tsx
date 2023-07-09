import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import employeesConfig from "../config/employee-config.json";
import React from "react";
import { getRandomEmployee } from "../utils/random";
import { employeesService } from "../config/service-config";
import { useDispatch } from "react-redux";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/CodeSlice";
import useCodeTypeDispatch from "../hooks/useCodeTypeDispatch";

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
  const dispatchCode = useCodeTypeDispatch();

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
    const codeMessage = {
      code: CodeType.UNKNOWN,
      message: "",
    };
    let successMessage = "";
    let error = "";
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
      successMessage = `${responses.length} employees were added succesfully`;
      setQuantity(0);
    } catch (e: any) {
      error = e;
    }
    console.log(error)
    dispatchCode(successMessage, error);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{ padding: 3, display: "flex", flexDirection: "column", gap: 2 }}
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
    </Box>
  );
};

export default EmployeeGenerator;
