import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Employee from "../model/Employee";
import { Visibility } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import EmployeeCard from "./EmployeeCard";

interface Props {
  employees: Employee[];
  role: string | undefined;
  truncated?: boolean;
  onRemoveEmplClick: (id: any) => void;
  onUpdateEmplClick: (employee: Employee) => void;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
}

const EmployeesTable: React.FC<Props> = ({
  employees,
  role,
  truncated = false,
  onRemoveEmplClick,
  onUpdateEmplClick,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const userColumns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.7 },
    { field: "name", headerName: "Name", flex: 1.6 },
    {
      field: "salary",
      headerName: "Salary",
      align: "left",
      headerAlign: "left",
      type: "number",
      flex: 1.1,
    },
    { field: "birthDate", headerName: "Birth date", type: "date", flex: 1.5 },
    { field: "department", headerName: "Department", flex: 1.7 },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.8,
      renderCell: (params: GridRenderCellParams<String>) =>
        params.value === "male" ? <ManIcon /> : <WomanIcon />,
    },
  ];

  const columnsTruncated: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.7 },
    { field: "name", headerName: "Name", flex: 1.6 },
    {
      field: "actions",
      type: "actions",
      flex: 0.3,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<Visibility />}
          label="Display"
          onClick={() => setSelectedEmployee(params.row)}
        />,
      ],
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
          onClick={() => onRemoveEmplClick(params.id)}
          label="Delete"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => onUpdateEmplClick(params.row)}
          label="Edit"
          showInMenu
        />,
      ],
    },
  ];

  const columns = useMemo(
    () => getColumns(role ?? "user", truncated),
    [role, truncated]
  );

  function getColumns(role: string, truncated: boolean): GridColDef[] {
    let res = [];
    if (truncated) {
      res = columnsTruncated;
    } else {
      res = role === "admin" ? adminColumns.concat(userColumns) : userColumns;
    }
    return res;
  }

  return (
    <>
      <DataGrid
        loading={employees.length === 0}
        columns={columns}
        rows={employees}
      />
      {selectedEmployee && truncated && (
        <Modal open onClose={() => setSelectedEmployee(null)}>
          <Box sx={modalStyle}>
            <EmployeeCard
              employee={selectedEmployee}
              role={role}
              onRemoveEmplClick={onRemoveEmplClick}
              onUpdateEmplClick={onUpdateEmplClick}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default EmployeesTable;
