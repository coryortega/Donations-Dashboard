import { ExportContainer } from "./ExportContainer";
import { Box } from "@mui/material";
import { FloatingButton } from "./FloatingButton"

export const Export = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "grey",
        padding: "20px",
      }}
    >
      <FloatingButton/>
      <ExportContainer />
    </Box>
  );
};
