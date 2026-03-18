"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { updateDrugTestDate } from "@/api/staff/public-mutations";
import { User } from "@/types/schema";

type AddDrugTestFormProps = {
  staff: User[];
};

const drugTestSchema = z.object({
  staffId: z.string().min(1, "Please select a staff member"),
  date: z.instanceof(Date, { message: "Please select a valid date" }),
});

type DrugTestFormValues = z.infer<typeof drugTestSchema>;

export default function AddDrugTestForm({
  staff,
}: AddDrugTestFormProps): ReactNode {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DrugTestFormValues>({
    resolver: zodResolver(drugTestSchema),
    defaultValues: {
      staffId: "",
      date: undefined,
    },
  });

  const handleOpen = (): void => setIsOpen(true);

  const handleClose = (): void => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = async (data: DrugTestFormValues): Promise<void> => {
    const selectedUser = staff.find((member) => member.id === data.staffId);

    if (!selectedUser) {
      enqueueSnackbar("Staff member not found", { variant: "error" });
      return;
    }

    setIsLoading(true);

    const [, error] = await updateDrugTestDate(selectedUser, data.date);

    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      setIsLoading(false);
      return;
    }

    enqueueSnackbar(`Drug test date updated for ${selectedUser.name}!`, {
      variant: "success",
    });

    setIsLoading(false);
    handleClose();
    router.refresh();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Completed Drug Test
      </Button>

      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
            Add Completed Drug Test
          </DialogTitle>

          <DialogContent dividers>
            <Stack spacing={3}>
              <Controller
                name="staffId"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.staffId}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Staff Member
                    </Typography>
                    <Select {...field} displayEmpty>
                      <MenuItem value="" disabled>
                        Select a staff member
                      </MenuItem>
                      {staff.map((member) => (
                        <MenuItem key={member.id} value={member.id}>
                          {member.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.staffId && (
                      <FormHelperText>{errors.staffId.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.date}>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Last Completed Drug Test
                    </Typography>
                    <DatePicker
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(value: Dayjs | null) => {
                        field.onChange(value ? value.toDate() : undefined);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.date,
                          helperText: errors.date?.message,
                          onBlur: field.onBlur,
                        },
                      }}
                    />
                  </FormControl>
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
              loading={isLoading}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
