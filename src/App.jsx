import "./App.css";
import { Panel } from "./components/Panel";
import Box from "@mui/material/Box";
import { NavBar } from "./components/NavBar";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Export } from "./components/Export";
import { Import } from "./components/Import";
import { Settings } from "./components/Settings";
import { PANEL_WIDTH } from "./constants";
import { DashboardContextStore } from "./components/context/context";
import { ExportContainer } from "./components/ExportContainer";

const PanelContainer = () => {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Panel />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${PANEL_WIDTH}px)` },
          marginTop: "64px",
        }}
      >
        <div style={location.pathname === "/export" ? {} : { padding: "10px" }}>
          <Outlet />
        </div>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <DashboardContextStore>
      <Routes>
        <Route element={<PanelContainer />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="import" element={<Import />} />
          <Route path="export" element={<Export />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="print" element={<ExportContainer />} />
        <Route path="*" element={<p>nuh uh</p>} />
      </Routes>
    </DashboardContextStore>
  );
}

export default App;
