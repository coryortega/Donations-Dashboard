import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Typography from "@mui/material/Typography";
import { formatDollar } from "../../utils";
import { mangoFusionPalette } from "@mui/x-charts";
import { Box } from "@mui/material";
import { TimeSelector } from "../TimeSelector";

const findMax = (arr) => {
  const filtered = arr.filter((item) => item !== "month");
  return Math.max(...filtered.map(Number));
};

const formatDataKeys = (obj) => {
  const dataKeys = [];
  for (const key of Object.keys(obj)) {
    if (key !== "month") {
      dataKeys.push({
        dataKey: key,
        label: key,
        valueFormatter: formatDollar,
      });
    }
  }

  return dataKeys;
};

export const BasicBarChart = ({
  data,
  title,
  hideSelector = false,
  ...rest
}) => {
  const [startTime, setStartTime] = useState(findMax(Object.keys(data[0])) - 5);
  const [endTime, setEndTime] = useState(findMax(Object.keys(data[0])) - 1);
  const [dataKeys, setDataKeys] = useState(formatDataKeys(data[0]));

  useEffect(() => {
    const formattedDataKeys = formatDataKeys(data[0]); 
    const filteredData = formattedDataKeys.filter(
      ({ label }) => parseInt(label) <= endTime && parseInt(label) >= startTime
    ); 
    setDataKeys(filteredData)

  }, [startTime, endTime]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingRight: "20px",
          paddingLeft: "20px",
          justifyContent: hideSelector ? "center" : "space-between",
        }}
      >
        <Typography variant="h5" sx={{ marginTop: "20px", color: "#58595b" }}>
          <strong>{title}</strong>
        </Typography>
        {!hideSelector ? (
          <TimeSelector
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            options={Object.keys(data[0]).filter((item) => item !== "month")}
          />
        ) : null}
      </Box>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "month" }]}
        series={dataKeys}
        height={400}
        colors={mangoFusionPalette}
        grid={{ vertical: false, horizontal: true }}
        {...rest}
      />
    </>
  );
};
