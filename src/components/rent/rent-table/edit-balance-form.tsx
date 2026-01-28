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
import { ReactNode, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Balance } from "@/types/balance";
import { currencyColor } from "@/utils/money/currency-color";
import { formatCurrency } from "@/utils/money/format-currency";

type EditBalanceFormValues = {
  amount: number;
  type: "increase" | "decrease";
};

type EditBalanceFormProps = {
  balance: Balance;
};

export default function EditBalanceForm({
  balance,
}: EditBalanceFormProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const { control, watch, reset, handleSubmit } =
    useForm<EditBalanceFormValues>({
      defaultValues: { amount: 0, type: "decrease" },
    });
  const fullName = `${balance.client.firstName} ${balance.client.lastName}`;

  const amount = watch("amount");
  const type = watch("type");

  const newBalance = useMemo(() => {
    return type === "decrease"
      ? Number(balance.total) + Number(amount || 0)
      : Number(balance.total) - Number(amount || 0);
  }, [type, amount, balance.total]);

  const onSubmit = (): void => {
    // eslint-disable-next-line no-console
    console.log("Submit:", {
      client: fullName,
      amount,
      type,
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
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                  sx={{ mb: 2 }}
                />
              )}
            />
            <Controller
              name="type"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup {...field} sx={{ mb: 2 }}>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControlLabel
                    value="increase"
                    control={<Radio />}
                    label="Increase Balance"
                  />
                  <FormControlLabel
                    value="decrease"
                    control={<Radio />}
                    label="Decrease Balance"
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
