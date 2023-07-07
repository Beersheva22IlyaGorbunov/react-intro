import { List, ListItem } from "@mui/material";
import React from "react";
import Employee from "../model/Employee";
import EmployeeCard from "./EmployeeCard";

type Props = {
  employees: Employee[];
  role: string | undefined;
  onRemoveEmplClick: (id: number) => void;
  onUpdateEmplClick: (employee: Employee) => void;
};

const EmployeesList: React.FC<Props> = ({
  employees,
  role,
  onRemoveEmplClick,
  onUpdateEmplClick,
}) => {
  return (
    <List sx={{height: "100%", overflowY: "scroll"}}>
      {employees.map((employee) => (
        <ListItem>
          <EmployeeCard
            employee={employee}
            role={role}
            onRemoveEmplClick={onRemoveEmplClick}
            onUpdateEmplClick={onUpdateEmplClick}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default EmployeesList;
