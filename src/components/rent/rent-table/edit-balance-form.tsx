import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { ReactNode, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { addTransaction } from "@/api/rent/public-mutations";
import { useRentContext } from "@/providers/rent-provider";
import { Balance } from "@/types/balance";
import { TRANSACTION_TYPE_VALUES } from "@/types/enums";
import { currencyColor } from "@/utils/money/currency-color";
import { formatCurrency } from "@/utils/money/format-currency";

const EditBalanceFormSchema = z.object({
  amount: z.number().min(0, "Amount must be at least 0"),
  type: z.enum(TRANSACTION_TYPE_VALUES),
});

type EditBalanceFormValues = z.infer<typeof EditBalanceFormSchema>;

type EditBalanceFormProps = {
  balance: Balance;
};

export default function EditBalanceForm({
  balance,
}: EditBalanceFormProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const { setClientBalances } = useRentContext();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBalanceFormValues>({
    resolver: zodResolver(EditBalanceFormSchema),
    defaultValues: { amount: 0, type: "payment" },
  });
  const fullName = `${balance.client.firstName} ${balance.client.lastName}`;

  const amount = watch("amount");
  const type = watch("type");

  const newBalance = useMemo(() => {
    return type === "payment"
      ? Number(balance.total) + Number(amount || 0)
      : Number(balance.total) - Number(amount || 0);
  }, [type, amount, balance.total]);

  const onSubmit = async (data: EditBalanceFormValues): Promise<void> => {
    const [, error] = await addTransaction({
      staffId: balance.client.staffId,
      clientId: balance.client.id,
      amount: String(data.amount),
      type: data.type,
    });

    if (error) {
      console.error("Failed to add transaction:", error);
      return;
    }

    if (error) {
      enqueueSnackbar(
        `Failed to charge ${fullName} of $${data.amount}. Please try again.`,
        {
          variant: "error",
        },
      );
      return;
    }

    const successMessage = `${fullName} charged $${data.amount} successfully!`;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setClientBalances((prevBalances) => {
      return prevBalances.map((b) => {
        if (b.client.id === balance.client.id) {
          return { ...b, total: newBalance };
        }
        return b;
      });
    });

    handleClose();
  };

  const handleOpen = (): void => {
    setIsOpen(true);
    reset();
  };

  const handleClose = (): void => {
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>

      <Dialog open={isOpen} fullWidth maxWidth="xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
            Update Balance Form
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>Client: {fullName}</Typography>
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
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup {...field} sx={{ my: 2 }}>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControlLabel
                    value="payment"
                    control={<Radio />}
                    label="Payment"
                  />
                  <FormControlLabel
                    value="charge"
                    control={<Radio />}
                    label="Charge"
                  />
                </RadioGroup>
              )}
            />

            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Current Balance</TableCell>
                    <TableCell align="center">New Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ color: currencyColor(balance.total) }}
                    >
                      {formatCurrency(balance.total)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: currencyColor(newBalance) }}
                    >
                      {formatCurrency(newBalance)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
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
