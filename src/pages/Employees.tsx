import React, { useEffect, useState } from "react";
import { authService, employeesService } from "../config/service-config";
import Employee from "../model/Employee";
import { Subscription } from "rxjs";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Alert, Box, Snackbar } from "@mui/material";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import { signOut } from "../redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/CodeSlice";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Name", flex: 2 },
  {
    field: "salary",
    headerName: "Salary",
    align: "left",
    headerAlign: "left",
    type: "number",
    flex: 1,
  },
  { field: "birthDate", headerName: "Birth date", type: "date", flex: 2 },
  { field: "department", headerName: "Department", flex: 2 },
  {
    field: "gender",
    headerName: "Gender",
    flex: 1.3,
    renderCell: (params: GridRenderCellParams<String>) =>
      params.value === "male" ? <ManIcon /> : <WomanIcon />,
  },
];

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [snackbarMsg, setSnackbarMsg] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = employeesService.getEmployees().subscribe({
      next(res: Employee[] | string) {
        if (typeof res === "string") {
          if (res.includes("Authentication")) {
            dispatch(codeActions.set({codeMsg: {code: CodeType.AUTH_ERROR, message: "Can't recognize you, you need to login"}}))
          } else {
            dispatch(codeActions.set({codeMsg: {code: CodeType.SERVER_ERROR, message: res}}))
          }
        } else {
          setEmployees(res);
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarMsg("");
  };

  return (
    <Box sx={{height: "80vh"}}>
      <DataGrid columns={columns} rows={employees} />
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={!!snackbarMsg}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Employees;
