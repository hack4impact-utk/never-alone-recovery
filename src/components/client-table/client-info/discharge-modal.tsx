"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

import { Client } from "@/types/schema";

type Props = {
  open: boolean;
  onClose: () => void;
  client: Client | null;
};

const clientInfoSchema = z.object({
  reason: z.enum(["AMA", "Dismissed"]),
  description: z.string().min(1, { message: "Description is required" }),
});

type ClientInfoValues = z.infer<typeof clientInfoSchema>;

export default function Discharge({ open, onClose, client }: Props): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientInfoValues>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: {
      reason: "AMA",
      description: "",
    },
  });

  const onSubmit = (data: ClientInfoValues): void => {
    setIsLoading(true);

    // eslint-disable-next-line no-console
    console.log("Form Data:", data);

    const successMessage = `Submitted successfully!`;
    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setIsLoading(false);
    setIsDisabled(false);
    reset();
    onClose();
  };

  const onError = (errors: FieldErrors<ClientInfoValues>): void => {
    // eslint-disable-next-line no-console
    console.log("Validation Errors:", errors);
    enqueueSnackbar("Please fix the errors in the form.", {
      variant: "error",
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" align="center">
            Client Discharge Form
          </Typography>

          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Box
              sx={{
                width: "min(90vw, 700px)",
                display: "grid",
                gap: 1.5,
                gridTemplateColumns: "1fr",
                padding: 3,
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
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || isDisabled}
                loading={isLoading}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}
