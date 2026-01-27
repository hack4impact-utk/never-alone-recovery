import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { StaffRole } from "@/types/enums";
import { User } from "@/types/schema";

type EditStaffFormValues = {
  role: StaffRole;
};

type EditStaffFormProps = {
  user: User;
};

export default function EditStaffForm({ user }: EditStaffFormProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit } = useForm<EditStaffFormValues>({
    defaultValues: {
      role: user.role,
    },
  });

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const onSubmit = (data: EditStaffFormValues): void => {
    // eslint-disable-next-line no-console
    console.log("Form Submitted:", {
      userId: user.id,
      originalName: user.name,
      newRole: data.role,
    });

    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{ m: 0, p: 2, textAlign: "center", position: "relative" }}
          >
            Staff Edit Form
          </DialogTitle>

          <DialogContent dividers>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle1">
                  <strong>Staff Name:</strong> {user.name}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>Staff Email:</strong> {user.email || "N/A"}
                </Typography>
              </Box>

              <Controller
                rules={{ required: true }}
                control={control}
                name="role"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormLabel>Role</FormLabel>
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="staff"
                      control={<Radio />}
                      label="Staff"
                    />
                    <FormControlLabel
                      value="disabled"
                      control={<Radio />}
                      label="Disabled"
                    />
                  </RadioGroup>
                )}
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ width: "45%" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "45%" }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
