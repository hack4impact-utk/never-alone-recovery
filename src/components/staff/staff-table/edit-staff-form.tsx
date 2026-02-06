import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { updateStaff } from "@/api/staff/public-mutations";
import { StaffRole } from "@/types/enums";
import { User } from "@/types/schema";

type EditStaffFormValues = {
  role: StaffRole;
};

type EditStaffFormProps = {
  user: User;
};

export default function EditStaffForm({ user }: EditStaffFormProps): ReactNode {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditStaffFormValues>({
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

  const onSubmit = async (data: EditStaffFormValues): Promise<void> => {
    setIsLoading(true);

    const [, error] = await updateStaff(user.id, data.role);

    setIsLoading(false);

    if (error) {
      enqueueSnackbar(error, {
        variant: "error",
      });
      return;
    }

    enqueueSnackbar(`${user.name}'s role updated to ${data.role}!`, {
      variant: "success",
    });

    handleClose();
    router.refresh();
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
                rules={{ required: "Please select a role" }}
                control={control}
                name="role"
                render={({ field }) => (
                  <Box>
                    <RadioGroup {...field}>
                      <FormLabel error={!!errors.role}>
                        Role {errors.role && "*"}
                      </FormLabel>
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
                    {errors.role && (
                      <FormHelperText error>
                        {errors.role.message}
                      </FormHelperText>
                    )}
                  </Box>
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
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
