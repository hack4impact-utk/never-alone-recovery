import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
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
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

type ClientRow = {
  id: string;
  total: number;
  firstName: string;
  lastName: string;
  email: string;
};

type EditBalanceFormValues = {
  amount: number;
  type: "increase" | "decrease";
};

type EditBalanceFormProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  client: ClientRow | null;
};

export default function EditBalanceForm({
  open,
  onClose,
  onSuccess,
  client,
}: EditBalanceFormProps): ReactNode {
  const { control, watch, reset, handleSubmit } =
    useForm<EditBalanceFormValues>({
      defaultValues: { amount: 0, type: "decrease" },
    });

  if (!client) {
    return null;
  }

  const amount = watch("amount");
  const type = watch("type");

  const newBalance =
    type === "decrease"
      ? Number(client.total) + Number(amount || 0)
      : Number(client.total) - Number(amount || 0);

  const handleClose = (): void => {
    reset();
    onClose();
  };

  const onSubmit = (): void => {
    // eslint-disable-next-line no-console
    console.log("Submit:", {
      client: client.firstName + " " + client.lastName,
      amount,
      type,
    });

    // Still need to update balance in database
    onSuccess();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
        Update Balance Form
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Client: {client?.firstName} {client?.lastName}
        </Typography>
        {/* Amount */}
        <Typography>Amount</Typography>
        <Controller
          name="amount"
          control={control}
          rules={{ required: true, min: 0 }}
          render={({ field }) => (
            <TextField
              {...field}
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
        <Typography>Type</Typography>
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field} sx={{ mb: 2 }}>
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
        {/* Balance Table */}
        <Box
          sx={{ border: "1px solid #ccc", borderRadius: 2, overflow: "hidden" }}
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
                  sx={{ color: client.total < 0 ? "red" : "green" }}
                >
                  {Number(client.total).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: newBalance < 0 ? "red" : "green" }}
                >
                  {newBalance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </DialogContent>

      {/* Cancel and Submit Buttons */}
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
