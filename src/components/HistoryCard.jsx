import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const HistoryCard = ({ number, description, iconComponent: Icon, ...rest }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        "& > :not(style)": {
          m: 1,
          p: 1,
          width: "100%",
          height: 128,
        },
      }}
    >
      <Paper elevation={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="overline" gutterBottom {...rest}>
            <strong>{description}</strong>
          </Typography>
          <Icon/>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60%",
            width: "100%"
          }}
        >
          <Typography variant="h4">
            {number}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
