import { Box, CircularProgress } from "@mui/material";
import { JSX, useEffect, useState } from "react";

type DocumentDisplayProps = {
  pdfUrl: string;
};

export default function DocumentDisplay({
  pdfUrl,
}: DocumentDisplayProps): JSX.Element {
  const [src, setSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    setSrc(pdfUrl);
  }, [pdfUrl]);

  return (
    <Box
      sx={{
        height: { xs: "400px", sm: "500px", md: "750px" },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <CircularProgress />}

      <iframe
        src={`${src}#toolbar=0`}
        width="100%"
        height="100%"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        hidden={isLoading}
      />
    </Box>
  );
}
