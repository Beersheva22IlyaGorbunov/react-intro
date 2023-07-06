import React, { ReactNode, useRef, useState } from "react";
import {
  FormControl,
  Grid,
  TextField,
  InputLabel,
  Select,
  Box,
  MenuItem,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Typography,
} from "@mui/material";
import Employee from "../../model/Employee";
import employeeConfig from "../../config/employee-config.json";
import ActionResult from "../../model/ActionResult";
import StatusType from "../../model/StatusType";
import Confirmation from "../common/Confirmation";

type Props = {
  onSubmit: (empl: Employee) => Promise<ActionResult>;
  initialEmployee?: Employee;
};

const initialDate: any = 0;
const initialGender: any = "";
const emptyEmployee: Employee = {
  id: 0,
  birthDate: initialDate,
  name: "",
  department: "",
  salary: 0,
  gender: initialGender,
};

const EmployeeForm: React.FC<Props> = ({
  onSubmit,
  initialEmployee = emptyEmployee,
}) => {
  const { minYear, minSalary, maxYear, maxSalary, departments } =
    employeeConfig;
  const [employee, setEmployee] = useState<Employee>(initialEmployee);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmation, setConfirmation] = useState<ReactNode>(null);
  const severity = useRef<StatusType>("success");

  function handlerName(event: any) {
    const name = event.target.value;
    const emplCopy = { ...employee };
    emplCopy.name = name;
    setEmployee(emplCopy);
  }
  function handlerBirthdate(event: any) {
    const birthDate = event.target.value;
    const emplCopy = { ...employee };
    emplCopy.birthDate = new Date(birthDate);
    setEmployee(emplCopy);
  }
  function handlerSalary(event: any) {
    const salary: number = +event.target.value;
    const emplCopy = { ...employee };
    emplCopy.salary = salary;
    setEmployee(emplCopy);
  }
  function handlerDepartment(event: any) {
    const department = event.target.value;
    const emplCopy = { ...employee };
    emplCopy.department = department;
    setEmployee(emplCopy);
  }
  function genderHandler(event: any) {
    setErrorMessage("");
    const gender: "male" | "female" = event.target.value;
    const emplCopy = { ...employee };
    emplCopy.gender = gender;
    setEmployee(emplCopy);
  }

  function handleSubmitClick(event: any) {
    event.preventDefault();
    if (initialEmployee !== emptyEmployee) {
      if (initialEmployee !== employee) {
        setConfirmation(
          <Confirmation
            title={"Edit employee?"}
            body={`You are going to edit employee.\n Are you sure that you want to update employee with id: ${initialEmployee.id}?`}
            onSubmit={() => {
              onSubmitFn(event);
              setConfirmation(null);
            }}
            onCancel={() => setConfirmation(null)}
          />
        );
      } else {
        onSubmitFn(event)
      }
    } else {
      onSubmitFn(event);
    }
  }

  async function onSubmitFn(event: any) {
    if (!employee.gender) {
      setErrorMessage("Please select gender");
    } else {
      const res = await onSubmit(employee);
      severity.current = res.status;
      res.status === "success" && event.target.reset();
      setAlertMessage(res.message!);
    }
  }

  function onResetFn(event: any) {
    setEmployee(initialEmployee);
  }

  return (
    <Box>
      <form
        onChange={() => setAlertMessage("")}
        onSubmit={handleSubmitClick}
        onReset={onResetFn}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              required
              fullWidth
              label="Employee name"
              helperText="Enter employee name"
              onChange={handlerName}
              value={employee.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Salary"
              fullWidth
              required
              type="number"
              onChange={handlerSalary}
              value={employee.salary || ""}
              helperText={`Enter salary in range [${minSalary}-${maxSalary}]`}
              inputProps={{
                min: `${minSalary}`,
                max: `${maxSalary}`,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="select-department-id">Department</InputLabel>
              <Select
                labelId="select-department-id"
                label="Department"
                value={employee.department}
                onChange={handlerDepartment}
              >
                {departments.map((dep) => (
                  <MenuItem value={dep} key={dep}>
                    {dep}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              required
              fullWidth
              disabled={initialEmployee !== emptyEmployee}
              label="birthDate"
              value={
                employee.birthDate
                  ? employee.birthDate.toISOString().substring(0, 10)
                  : ""
              }
              inputProps={{
                min: `${minYear}-01-01`,
                max: `${maxYear}-12-31`,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handlerBirthdate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required error={!!errorMessage}>
              <FormLabel id="gender-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-group-label"
                defaultValue=""
                value={employee.gender || ""}
                name="radio-buttons-group"
                row
                onChange={genderHandler}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  disabled={initialEmployee !== emptyEmployee}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  disabled={initialEmployee !== emptyEmployee}
                />
                <FormHelperText>{errorMessage}</FormHelperText>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        {alertMessage && <Typography color="error">{alertMessage}</Typography>}
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            sx={{ mr: 2, width: "50%" }}
            color="warning"
            variant="outlined"
            type="reset"
          >
            Reset
          </Button>
          <Button sx={{ width: "50%" }} type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
      {confirmation}
    </Box>
  );
};

export default EmployeeForm;
