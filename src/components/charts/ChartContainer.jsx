import Box from "@mui/material/Box";

export const ChartContainer = (props) => {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#e0e0e0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        m: "8px",
        height: "454px",
      }}
    >
      {props.children}
    </Box>
  );
};
