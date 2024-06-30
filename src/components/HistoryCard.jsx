import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const HistoryCard = ({
  number,
  description,
  iconComponent: Icon,
  ...rest
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "center",
        colorAdjust: "exact",
        WebkitPrintColorAdjust: "exact",
        "& > :not(style)": {
          m: 1,
          p: 1,
          width: "90%",
          height: 128,
        },
      }}
    >
      <Paper
        elevation={1}
        className="printable-paper"
        backgroundColor="#048c88"
        color="white"
        sx={{ backgroundColor: "#048c88", color: "white" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="overline" lineHeight={"inherit"} {...rest}>
            <strong>{description}</strong>
          </Typography>
          <Icon />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60%",
            width: "100%",
          }}
        >
          <Typography variant="h4">{number}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};
