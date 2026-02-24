import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const IncreaseBalanceFormSchema = z.object({
  amount: z.number().min(0, { message: "Amount must be at least 0" }),
});

export type IncreaseBalanceFormValues = z.infer<
  typeof IncreaseBalanceFormSchema
>;

type IncreaseBalanceFormProps = {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: IncreaseBalanceFormValues) => Promise<void>;
};

export default function IncreaseBalanceForm({
  open,
  handleClose,
  onSubmit,
}: IncreaseBalanceFormProps): ReactNode {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IncreaseBalanceFormValues>({
    resolver: zodResolver(IncreaseBalanceFormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const handleBalanceClose = (): void => {
    reset();
    handleClose();
  };

  const handleFormSubmit = async (
    data: IncreaseBalanceFormValues,
  ): Promise<void> => {
    await onSubmit(data);
    reset();
  };

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="xs">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
              Increase Balance Form
            </DialogTitle>
            <DialogContent>
              <Controller
                name="amount"
                control={control}
                rules={{ required: true, min: 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Amount"
                    type="number"
                    error={!!errors.amount}
                    helperText={errors.amount?.message}
                    fullWidth
                    margin="dense"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      },
                    }}
                    onChange={(event) => {
                      field.onChange(Number(event.target.value));
                    }}
                  />
                )}
              />
            </DialogContent>

            <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={handleBalanceClose}
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
                Charge
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </>
  );
}
