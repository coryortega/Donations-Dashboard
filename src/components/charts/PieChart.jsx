import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  mangoFusionPaletteLight
} from '@mui/x-charts/colorPalettes';
const dataOne = [
  { value: 0, label: "Newsletter" },
  { value: 0, label: "Appeal" },
  { value: 0, label: "Web" },
  { value: 0, label: "Other" },
  { value: 100, label: "Unattributed" }
];

const dataTwo = [
  { value: 0, label: "Newsletter" },
  { value: 0, label: "Appeal" },
  { value: 0, label: "Web" },
  { value: 0, label: "Other" },
  { value: 100, label: "Unattributed" }
];

const size = {
  width: 360,
  height: 190,
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
        <strong>{title}</strong> <br /> <strong>for {year}</strong>
      </Typography>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 15,
            data: year === "2023" ? data1 : data2,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        colors={mangoFusionPaletteLight}
        {...size}
        {...rest}
      />
    </Box>
  );
};
