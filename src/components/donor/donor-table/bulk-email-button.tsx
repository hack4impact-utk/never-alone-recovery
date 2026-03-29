"use client";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";

import { Donor } from "@/types/schema";

type DonorTableProps = {
  donors: Donor[];
};

export default function BulkEmailButton({
  donors,
}: DonorTableProps): ReactNode {
  const { data: session } = useSession();

  const emailDonors = (): void => {
    if (donors.length === 0) return;

    const userEmail = session?.user.email;

    const emailList = donors
      .map((donor) => donor.email)
      .filter((email) => !!email)
      .join(",");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${userEmail}&bcc=${emailList}`;

    window.open(gmailUrl, "_blank");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={emailDonors}
      disabled={donors.length === 0}
    >
      Email
    </Button>
  );
}
