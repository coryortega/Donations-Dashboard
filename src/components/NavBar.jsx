import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import { PANEL_WIDTH } from "../constants";

export const NavBar = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: `calc(100% - ${PANEL_WIDTH}px)` },
        ml: { sm: `${PANEL_WIDTH}px` },
        background: "white",
      }}
    >
      <Toolbar sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Box sx={{width: "120px", display: "flex", justifyContent: "space-between"}}>
          <Link href="#" underline="hover" color="black">
            Profile
          </Link>
          <Link href="#" underline="hover" color="black">
            Log out
          </Link>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
