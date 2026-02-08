import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { CSSProperties, ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

export type IncreaseBalanceFormValues = {
  amount: string;
};

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
  const { control, handleSubmit } = useForm<IncreaseBalanceFormValues>({
    defaultValues: { amount: "0" },
  });

  return (
    <>
      <Dialog open={open} fullWidth maxWidth="xs">
        <form style={formStyle} onSubmit={handleSubmit(onSubmit)}>
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
                  fullWidth
                  margin="dense"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
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
              Charge
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
