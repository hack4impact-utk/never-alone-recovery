import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export type StaffRow = {
  id: string;
  name: string;
  email: string | null;
  role: "disabled" | "staff" | "admin";
};

type EditStaffFormValues = {
  role: "disabled" | "staff" | "admin";
};

type EditStaffFormProps = {
  open: boolean;
  onClose: () => void;
  user: StaffRow | null;
};

export default function EditStaffForm({
  open,
  onClose,
  user,
}: EditStaffFormProps): ReactNode {
  const { control, handleSubmit, reset } = useForm<EditStaffFormValues>({
    defaultValues: {
      role: user?.role || "staff",
    },
  });

  useEffect(() => {
    if (user) {
      reset({ role: user.role });
    }
  }, [user, reset]);

  const onSubmit = (data: EditStaffFormValues): void => {
    if (!user) return;

    // eslint-disable-next-line no-console
    console.log("Form Submitted:", {
      userId: user.id,
      originalName: user.name,
      newRole: data.role,
    });

    onClose();
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{ m: 0, p: 2, textAlign: "center", position: "relative" }}
        >
          Staff Edit Form
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
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

            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ mb: 1, color: "text.primary" }}
              >
                Role
              </FormLabel>
              <Controller
                rules={{ required: true }}
                control={control}
                name="role"
                render={({ field }) => (
                  <RadioGroup {...field}>
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
            </FormControl>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={onClose} sx={{ width: "45%" }}>
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
  );
}
