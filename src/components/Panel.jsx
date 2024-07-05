import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { PANEL_WIDTH } from "../constants";

export const Panel = () => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: PANEL_WIDTH }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        container={window.document.body}
        hideBackdrop={false}
        variant="persistent"
        open={true}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: PANEL_WIDTH },
        }}
      >
        <div style={{ height: "100%", overflow: "hidden" }}>
          <Toolbar>
            <div
              style={{
                width: PANEL_WIDTH,
                height: 64,
                overflow: "hidden",
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="https://www.fluidcom.net/images/fluid-communications-inc-orange-ca-small.png"
                width="70%"
                height="100%"
                style={{ position: "absolute", top: 12 }}
              />
            </div>
          </Toolbar>
          <Divider />
          <div
            style={{
              display: "flex",
              height: `calc(100% - 63px)`,
              overflowY: "hidden",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <List>
                <Link to="/">
                  <ListItem key={"Dashboard"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <DashboardIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Dashboard"}
                        style={{ textDecoration: "none", color: "black" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to="/import">
                  <ListItem key={"Import CSV's"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <FileOpenIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Import CSV's"}
                        style={{ textDecoration: "none", color: "black" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link to="/export">
                  <ListItem key={"Export"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <FileDownloadIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Export"}
                        style={{ textDecoration: "none", color: "black" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </div>
            <div>
              <Divider />
              <List>
                <Link to="/settings">
                  <ListItem key={"Settings"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={"Settings"}
                        style={{ textDecoration: "none", color: "black" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </div>
          </div>
        </div>
      </Drawer>
    </Box>
  );
};
