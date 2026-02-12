"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

import { dischargeClient } from "@/api/client/public-mutations";
import { Client } from "@/types/schema";

type DischargeProps = {
  client: Client;
};

const clientInfoSchema = z.object({
  reason: z
    .string()
    .min(1, { message: "Reason is required" })
    .refine((val) => ["AMA", "Dismissed"].includes(val)),
  description: z.string().min(1, { message: "Description is required" }),
});

type ClientInfoValues = z.infer<typeof clientInfoSchema>;

export default function Discharge({ client }: DischargeProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientInfoValues>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: {
      reason: "",
      description: "",
    },
  });

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const onSubmit = async (data: ClientInfoValues): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log("Form Data:", data);

    const [updatedClient, error] = await dischargeClient(client);

    if (error || !updatedClient) {
      enqueueSnackbar(
        `Failed to discharge "${client.firstName} ${client.lastName}". Please try again.`,
        {
          variant: "error",
        },
      );
      return;
    }

    const successMessage = `"${updatedClient.firstName} ${updatedClient.lastName}" marked as discharged.`;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    reset();
    handleClose();
  };

  const onError = (errors: FieldErrors<ClientInfoValues>): void => {
    // eslint-disable-next-line no-console
    console.log("Validation Errors:", errors);
    enqueueSnackbar("Please fix the errors in the form.", {
      variant: "error",
    });
  };

  return (
    <>
      <Button variant="outlined" sx={{ width: "100%" }} onClick={handleOpen}>
        Discharge
      </Button>

      <Dialog open={isOpen} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
            Client Discharge Form
          </DialogTitle>
          <DialogContent
            sx={{
              py: 0,
              px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="subtitle1">
              Client: {client?.firstName} {client?.lastName}
            </Typography>
            <Controller
              control={control}
              name="reason"
              render={({ field }) => (
                <FormControl error={!!errors.reason}>
                  <FormLabel>Reason for Discharge</FormLabel>

                  <RadioGroup {...field}>
                    <FormControlLabel
                      value="AMA"
                      control={<Radio />}
                      label="AMA"
                    />
                    <FormControlLabel
                      value="Dismissed"
                      control={<Radio />}
                      label="Dismissed"
                    />
                  </RadioGroup>
                  {errors.reason && (
                    <FormHelperText>{errors.reason.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  multiline
                  rows={3}
                />
              )}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              onClick={() => {
                reset();
                handleClose();
              }}
              sx={{ width: "50%" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "50%" }}
            >
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
