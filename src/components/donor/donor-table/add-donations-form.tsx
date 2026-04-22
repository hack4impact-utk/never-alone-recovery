import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
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

import { addDonation } from "@/api/donor/public-mutations";
import { useDonorContext } from "@/providers/donor-provider";
import { DonorTotal } from "@/types/donor-total";
import { currencyColor } from "@/utils/money/currency-color";
import { formatCurrency } from "@/utils/money/format-currency";

const AddDonationFormSchema = z.object({
  amount: z.number().min(0, "Amount must be at least 0"),
});

type AddDonationFormValues = z.infer<typeof AddDonationFormSchema>;

type AddDonationFormProps = {
  total: DonorTotal;
};

export default function AddDonationForm({
  total,
}: AddDonationFormProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const { setDonorTotals } = useDonorContext();
  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDonationFormValues>({
    resolver: zodResolver(AddDonationFormSchema),
    defaultValues: { amount: 0 },
  });
  const fullName = `${total.donor.firstName} ${total.donor.lastName}`;

  const amount = watch("amount");

  const newDonationTotal = useMemo(() => {
    return Number(total.total) + Number(amount || 0);
  }, [amount, total.total]);

  const onSubmit = async (data: AddDonationFormValues): Promise<void> => {
    const [, error] = await addDonation({
      donorId: total.donor.id,
      amount: String(data.amount),
    });

    if (error) {
      console.error("Failed to add transaction:", error);
      return;
    }

    if (error) {
      enqueueSnackbar(
        `Failed to add donation of $${data.amount} to ${fullName}. Please try again.`,
        {
          variant: "error",
        },
      );
      return;
    }

    const successMessage = `Added donation of $${data.amount} for ${fullName} successfully!`;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setDonorTotals((prevDonations) => {
      return prevDonations.map((b) => {
        if (b.donor.id === total.donor.id) {
          return { ...b, total: newDonationTotal };
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
            Add Donation Form
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>Donor: {fullName}</Typography>
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
                    <TableCell align="center">Current Donation Total</TableCell>
                    <TableCell align="center">New Donation Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ color: currencyColor(total.total) }}
                    >
                      {formatCurrency(total.total)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: currencyColor(newDonationTotal) }}
                    >
                      {formatCurrency(newDonationTotal)}
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
