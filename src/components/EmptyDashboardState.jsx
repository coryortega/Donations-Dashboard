import { Typography, Box, Link as MuiLink } from "@mui/material";
import { EmptyStateIcon } from "./EmptyStateIcon";
import { Link } from "react-router-dom";

export const EmptyDashboardState = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
      }}
    >
      <EmptyStateIcon />
      <Box>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          No data to display
        </Typography>
        Try {" "}
        <Link to="/import" style={{ textDecoration: "none" }}>
          <MuiLink>importing CSV's</MuiLink>
        </Link>{" "}
        to see some data.
      </Box>
    </Box>
  );
};
