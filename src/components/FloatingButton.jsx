import Fab from "@mui/material/Fab";
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from "react-router-dom";

export const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/print");
    setTimeout(() => {
      print();
    }, 500);
  };

  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={handleClick}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 20,
        background: "#0281a5",
      }}
    >
      <DownloadIcon />
    </Fab>
  );
};

export default FloatingButton;
