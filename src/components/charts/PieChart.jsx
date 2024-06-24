import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLOR_PALETTE } from "../../constants";
import { mangoFusionPalette, cheerfulFiestaPalette } from "@mui/x-charts";
const dataOne = [
  { value: 30, label: "Newsletter" },
  { value: 5, label: "Appeal" },
  { value: 40, label: "Web" },
  { value: 25, label: "Other" },
];

const dataTwo = [
  { value: 40, label: "Newsletter" },
  { value: 25, label: "Appeal" },
  { value: 20, label: "Web" },
  { value: 15, label: "Other" },
];

const size = {
  width: 350,
  height: 200,
};

export const BasicPieChart = ({
  year,
  title,
  data1 = dataOne,
  data2 = dataTwo,
  ...rest
}) => {
  return (
    <Box
      sx={{
        // height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6" sx={{ marginTop: "20px", textAlign: "center",  color: "#58595b" }}>
        <strong>{title}</strong> <br /> <strong>Over {year}</strong>
      </Typography>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 15,
            data: year === "1 Year" ? data1 : data2,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        colors={mangoFusionPalette}
        {...size}
        {...rest}
      />
    </Box>
  );
};
