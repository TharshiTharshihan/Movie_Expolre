import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        p: 2,
        flexWrap: "wrap",
      }}
    >
      <TextField
        label="Search Movies"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          backgroundColor: theme.palette.background.paper,
          "& .MuiInputBase-root": {
            color: theme.palette.text.primary,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
          },
        }}
      />
      <Button
        variant="contained"
        onClick={onSearch}
        sx={{
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
