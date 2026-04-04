"use client";

import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
} from "@mui/material";
import { ReactNode, useRef, useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";

type ControlledSignaturePadProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  gridProps?: GridProps;
};

export default function ControlledSignaturePad<
  TFieldValues extends FieldValues,
>({
  name,
  control,
  label,
  gridProps,
}: ControlledSignaturePadProps<TFieldValues>): ReactNode {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  const handleSubmit = (onSign: (data: string) => void): void => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) return;

    const signatureData = sigCanvas.current.toDataURL("image/png");

    onSign(signatureData);

    handleClose();
  };

  const handleClear = (): void => sigCanvas.current?.clear();

  return (
    <Grid {...gridProps}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error}>
            <Button
              variant="outlined"
              onClick={handleOpen}
              sx={{
                justifyContent: "space-between",
                px: 2,
                textTransform: "none",
                borderColor: error ? "error.main" : "",
              }}
            >
              <Box component="span">{`Add ${label}`}</Box>
              <Chip
                label={field.value ? "Signed" : "Required"}
                color={field.value ? "success" : "default"}
                size="small"
              />
            </Button>
            {error && <FormHelperText>{error.message}</FormHelperText>}

            <Dialog open={isOpen} fullWidth maxWidth="sm" onClose={handleClose}>
              <DialogTitle sx={{ pb: 1 }}>{label}</DialogTitle>
              <DialogContent sx={{ pt: 0.5 }}>
                <DialogContentText sx={{ mb: 1.5 }}>
                  Draw your signature in the box below.
                </DialogContentText>
                <Box
                  sx={{
                    border: 1,
                    borderRadius: 2,
                    height: "250px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "15%",
                      left: 25,
                      right: 25,
                      borderBottom: "2px dashed",
                      borderColor: "text.disabled",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  />

                  <SignatureCanvas
                    canvasProps={{
                      style: {
                        width: "100%",
                        height: "100%",
                      },
                    }}
                    ref={sigCanvas}
                    minWidth={4}
                    maxWidth={4}
                  />
                </Box>
              </DialogContent>

              <DialogActions
                sx={{
                  px: 3,
                  pb: 2.5,
                  gap: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Button variant="text" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="outlined" onClick={handleClear}>
                  Clear
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit(field.onChange);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Save Signature
                </Button>
              </DialogActions>
            </Dialog>
          </FormControl>
        )}
      />
    </Grid>
  );
}
