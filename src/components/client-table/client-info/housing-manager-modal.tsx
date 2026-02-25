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

import { Client } from "@/types/schema";
import { HousingManger } from "@/types/housing-manager";

type HousingManagerProps = {
  client: Client;
  housingManagers: HousingManger[] | null;
};

const housingManagerSchema = z.object({
  manager: z.object({
    id: z.string(),
    name: z.string(),
  })
});

type HousingManagerValues = z.infer<typeof housingManagerSchema>;

export default function ChangeHousingManger({
  client,
  housingManagers,
}: HousingManagerProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HousingManagerValues>({
    resolver: zodResolver(housingManagerSchema),
    defaultValues: {
      manager: {}
    },
  });

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const onSubmit = async (): Promise<void> => {
    // const [updatedClient, error] = await dischargeClient(client);

    // if (error || !updatedClient) {
    //   enqueueSnackbar(
    //     `Failed to discharge "${client.firstName} ${client.lastName}". Please try again.`,
    //     {
    //       variant: "error",
    //     },
    //   );
    //   return;
    // }

    // const successMessage = `"${updatedClient.firstName} ${updatedClient.lastName}" marked as discharged.`;

    // enqueueSnackbar(successMessage, {
    //   variant: "success",
    // });

    // onDischarge(updatedClient);

    // handleClose();
  };

  const onError = (errors: FieldErrors<HousingManagerValues>): void => {
    // eslint-disable-next-line no-console
    console.log("Validation Errors:", errors);
    enqueueSnackbar("Please fix the errors in the form.", {
      variant: "error",
    });
  };

  return (
    <>
      <Button variant="outlined" sx={{ width: "100%" }} onClick={handleOpen}>
        Change Housing Manger
      </Button>

      <Dialog open={isOpen} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
            Change Housing Manager
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
              Person: {client?.firstName} {client?.lastName}
            </Typography>
            <Controller
              name="manager"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" error={!!errors.manager}>
                  <FormLabel component="legend">Select a new housing manager</FormLabel>
                  <RadioGroup {...field}>
                    {housingManagers && housingManagers.length > 0 ? (
                      housingManagers.map((manager) => (
                        <FormControlLabel
                          key={manager.id}
                          value={manager.id}
                          control={<Radio />}
                          label={manager.name}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No available housing managers.
                      </Typography>
                    )}
                  </RadioGroup>
                  {errors.manager && (
                    <FormHelperText>{errors.manager.message}</FormHelperText>
                  )}
                </FormControl>
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
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
