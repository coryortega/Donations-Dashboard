import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import { formatDollar } from "../../utils";
import { COLOR_PALETTE } from "../../constants"
import { mangoFusionPalette } from "@mui/x-charts";

export const BasicBarChart = ({ data, title, ...rest }) => {
  const dataKeys = [];
  for (const key of Object.keys(data[0])) {
    if (key !== "month") {
      dataKeys.push({
        dataKey: key,
        label: key,
        valueFormatter: formatDollar,
      });
    }
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: "20px", textAlign: "center", color: "#58595b" }}>
        <strong>{title}</strong>
      </Typography>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={dataKeys}
        height={400}
        colors={mangoFusionPalette}
        {...rest}
      />
    </>
  );
};
