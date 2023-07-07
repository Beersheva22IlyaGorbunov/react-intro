import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Employee from "../model/Employee";

type Props = {
  employees: Employee[];
  role: string | undefined;
  onRemoveEmplClick: (id: number) => void;
  onUpdateEmplClick: (employee: Employee) => void;
}

const EmployeesTable: React.FC<Props> = ({ employees, role, onRemoveEmplClick, onUpdateEmplClick }) => {
  const userColumns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.3 },
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

  const adminColumns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      flex: 0.5,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => onRemoveEmplClick(+params.id)}
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
    () => getColumns(role ?? "user"),
    [role]
  );

  function getColumns(role: string): GridColDef[] {
    return role === "admin" ? adminColumns.concat(userColumns) : userColumns;
  }

  return (
    <DataGrid
      loading={employees.length === 0}
      columns={columns}
      rows={employees}
    />
  );
};

export default EmployeesTable;
