"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Please enter a valid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ExampleForm(): ReactNode {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues): void => {
    setIsLoading(true);

    const { name, email, message } = data;

    const successMessage = `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

    enqueueSnackbar(successMessage, {
      variant: "success",
    });

    setIsLoading(false);
    setIsDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "min(90vw, 700px)",
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: "1fr",
          boxShadow: 2,
          borderRadius: 2,
          padding: 3,
        }}
      >
        <Typography variant="h4">Contact us</Typography>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <TextField
              {...field}
              label="Message"
              error={!!errors.message}
              helperText={errors.message?.message}
              multiline
              rows={4}
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
  );
}
