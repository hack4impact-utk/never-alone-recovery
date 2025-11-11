import ClearIcon from "@mui/icons-material/Clear";
import Search from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import { JSX } from "react";

type SearchBoxProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export default function SearchBox({
  searchQuery,
  setSearchQuery,
}: SearchBoxProps): JSX.Element {
  return (
    <Box display="flex" alignItems="center">
      <TextField
        id="search-bar"
        className="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Search..."
        size="small"
        sx={{ width: "450px" }}
        slotProps={{
          input: {
            endAdornment: (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {searchQuery && (
                  <IconButton
                    onClick={() => setSearchQuery("")}
                    edge="end"
                    size="small"
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </Box>
            ),
          },
        }}
      />
      <Search sx={{ fontSize: 35, ml: 1 }} color="primary" />
    </Box>
  );
}
