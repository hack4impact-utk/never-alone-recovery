"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import EmailIcon from "@mui/icons-material/Email";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";

import { HousingManager } from "@/types/housing-manager";
import { Client } from "@/types/schema";

type HousingManagerProps = {
  client: Client;
  housingManagers: HousingManager[];
};

const housingManagerSchema = z.object({
  manager: z.string().min(1, "Please select a housing manager"),
});

type HousingManagerValues = z.infer<typeof housingManagerSchema>;

export default function ChangeHousingManger({
  client,
  housingManagers,
}: HousingManagerProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HousingManagerValues>({
    resolver: zodResolver(housingManagerSchema),
    defaultValues: {
      manager: "",
    },
  });

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  const onSubmit = (data: HousingManagerValues): void => {
    // eslint-disable-next-line no-console
    console.log("Selected Housing Manager:", data.manager);
    reset();
  };

  const onError = (errors: FieldErrors<HousingManagerValues>): void => {
    // eslint-disable-next-line no-console
    console.log("Validation Errors:", errors);
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
            <Typography variant="subtitle1">New Housing Manager?</Typography>
            <Controller
              name="manager"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.manager}>
                  <Select
                    {...field}
                    MenuProps={{
                      PaperProps: {
                        style: { maxHeight: 200, overflowY: "auto" },
                      },
                    }}
                  >
                    {housingManagers.length > 0 ? (
                      housingManagers.map((manager) => (
                        <MenuItem key={manager.id} value={manager.id}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <EmailIcon fontSize="small" />
                            {manager.name}
                          </Box>
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        <Typography variant="body2" color="textSecondary">
                          No available housing managers.
                        </Typography>
                      </MenuItem>
                    )}
                  </Select>
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
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
