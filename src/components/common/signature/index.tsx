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

type SignatureProps = {};

export default function Signature({}: SignatureProps): JSX.Element {
  const sigCanvas = useRef(null);
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Sign</Button>

      <Dialog open={isOpen} fullWidth maxWidth="sm">
        <DialogTitle variant="h5" sx={{ p: 2, textAlign: "center" }}>
          Please Sign Below
        </DialogTitle>
        <DialogContent>
          <Box sx={{ border: "1px solid #000", height: "300px" }}>
            <SignatureCanvas
              canvasProps={{ style: { width: "100%", height: "100%" } }}
              ref={sigCanvas}
            />
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
            onClick={handleClose}
            variant="contained"
            color="primary"
            sx={{ width: "45%" }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
