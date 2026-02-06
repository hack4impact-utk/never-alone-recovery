"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState, useRef, JSX } from "react";
import SignatureCanvas from "react-signature-canvas";

type SignatureProps = {
  onSave: (signatureData: string) => void;
  title: string;
  description: string;
};

export default function Signature({
  onSave,
  title,
  description,
}: SignatureProps): JSX.Element {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = () => {
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) return;

    const signatureData = sigCanvas.current.toDataURL("image/png");
    onSave(signatureData);

    handleClose();
  };

  const handleClear = () => sigCanvas.current?.clear();

  return (
    <>
      <Button onClick={handleOpen} variant="contained" color="primary">
        {title}
      </Button>

      <Dialog open={isOpen} fullWidth maxWidth="sm">
        <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
          {description}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: "1px solid #ccc",
              height: "300px",
              position: "relative",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: "60px",
                left: "10%",
                right: "10%",
                borderBottom: "2px dashed #999",
                pointerEvents: "none",
                zIndex: 0,
                "&::before": {
                  content: '"X"',
                  position: "absolute",
                  left: "-20px",
                  bottom: "-5px",
                  color: "#999",
                  fontWeight: "bold",
                },
              }}
            />

            <SignatureCanvas
              canvasProps={{
                style: {
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  zIndex: 1,
                },
              }}
              ref={sigCanvas}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button variant="outlined" fullWidth onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" fullWidth onClick={handleClear}>
            Clear
          </Button>
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
