import React, { ReactNode, useMemo, useState } from "react";
import { employeesService } from "../config/service-config";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { Box, Paper, Typography } from "@mui/material";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import DeleteIcon from "@mui/icons-material/Delete";
import useEmployees from "../hooks/useEmployees";
import { useAuthSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { codeActions } from "../redux/slices/CodeSlice";
import CodeType from "../model/CodeType";
import Confirmation from "../components/common/Confirmation";
import EditIcon from "@mui/icons-material/Edit";
import Employee from "../model/Employee";
import ActionResult from "../model/ActionResult";
import UpdateEmployeeModal from "../components/UpdateEmployeeModal";

const Employees: React.FC = () => {
  const employees = useEmployees();
  const userData = useAuthSelector();
  const dispatch = useDispatch();
  const [employeeToUpdate, setEmployeeToUpdate] = useState<
    Employee | null
  >(null);
  const [removeEmplId, setRemoveEmplId] = useState<number | null>(null);

  const userColumns: GridColDef[] = [
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
      flex: 0.8,
      renderCell: (params: GridRenderCellParams<String>) =>
        params.value === "male" ? <ManIcon /> : <WomanIcon />,
    },
  ];

  const adminColumns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => setRemoveEmplId(+params.id)}
          label="Delete"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => setEmployeeToUpdate(params.row)}
          label="Edit"
          showInMenu
        />,
      ],
    },
  ];

  const columns = useMemo(
    () => getColumns(userData?.role ?? "user"),
    [userData]
  );

  function getColumns(role: string): GridColDef[] {
    return role === "admin" ? adminColumns.concat(userColumns) : userColumns;
  }

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
      const updatedEmployee = await employeesService.updateEmployee(employeeToUpdate);
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
          <DataGrid
            loading={employees.length === 0}
            columns={columns}
            rows={employees}
          />
        </Box>
      </Paper>
      {employeeToUpdate && (
        <UpdateEmployeeModal
          onClose={() => setEmployeeToUpdate(null)}
          onSubmit={handleUpdateEmployee}
          employee={employeeToUpdate}
        />
      )}
      {removeEmplId && <Confirmation
        title={"Delete employee?"}
        body={`You are going to delete employee with id: ${removeEmplId}. Are you sure?`}
        onSubmit={() => {
          deleteEmployee(removeEmplId);
          setRemoveEmplId(null);
        }}
        onCancel={() => setRemoveEmplId(null)}
      />}
    </>
  );
};

export default Employees;
