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
import { enqueueSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { chargeAllClients } from "@/api/rent/public-mutations";
import { useRentContext } from "@/providers/rent-provider";
import { NewRentTransaction } from "@/types/schema";

export const IncreaseBalanceFormSchema = z.object({
  amount: z.number().min(0, { message: "Amount must be at least 0" }),
});

export type IncreaseBalanceFormValues = z.infer<
  typeof IncreaseBalanceFormSchema
>;

export default function IncreaseBalanceForm(): ReactNode {
  const { clientBalances, setClientBalances } = useRentContext();
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = async (data: IncreaseBalanceFormValues): Promise<void> => {
    const newRentTransactions: NewRentTransaction[] = clientBalances.map(
      (balance) => {
        return {
          staffId: balance.client.staffId,
          type: "charge",
          clientId: balance.client.id,
          amount: String(data.amount),
        };
      },
    );
    const [, error] = await chargeAllClients(newRentTransactions);

    if (error) {
      enqueueSnackbar(
        `Failed to charge clients of $${data.amount}. Please try again.`,
        {
          variant: "error",
        },
      );
      return;
    }

    const successMessage = `Clients charged $${data.amount} successfully!`;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setClientBalances((prevBalances) =>
      prevBalances.map((balance) => ({
        ...balance,
        total: balance.total - data.amount,
      })),
    );

    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Increase Balance
      </Button>
      <Dialog open={isOpen} fullWidth maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                      field.onChange(Number(event.target.value) || "");
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
          </Box>
        </form>
      </Dialog>
    </>
  );
}
