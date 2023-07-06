import { Container, Modal, Paper, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import ActionResult from "../model/ActionResult";
import Employee from "../model/Employee";
import Confirmation from "./common/Confirmation";
import EmployeeForm from "./forms/EmployeeForm";

type Props = {
  onClose: () => void;
  onSubmit: (updatedEmployee: Employee) => Promise<ActionResult>;
  employee: Employee;
};

const UpdateEmployeeModal: React.FC<Props> = ({
  onClose,
  onSubmit,
  employee,
}) => {
  const [confirmation, setConfirmation] = useState<ReactNode>(null);

  async function handleSubmitForm(employeeToUpdate: Employee): Promise<ActionResult> {
    const res: ActionResult = {
      status: "error",
      message: ""
    }
    if (employeeToUpdate === employee) {
      onClose();
    } else {
      const { status, message } = await onSubmit(employeeToUpdate);
      res.status = status
      res.message = message
      if (res.status === 'success') {
        onClose();
      }
      
    }
    return res;
  }

  function handleCloseForm(): void {
    setConfirmation(
      <Confirmation
        title={"Close form?"}
        body={
          "You are going to close edit employee form. All unsaved data will be lost."
        }
        onSubmit={onClose}
        onCancel={() => setConfirmation(null)}
      />
    );
  }

  return (
    <>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={true}
        onClose={handleCloseForm}
      >
        <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" mb={2}>
            Edit employee id: {employee.id}
          </Typography>
          <EmployeeForm
            onSubmit={handleSubmitForm}
            initialEmployee={employee}
          />
        </Paper>
        </Container>
      </Modal>
      {confirmation}
    </>
  );
};

export default UpdateEmployeeModal;
