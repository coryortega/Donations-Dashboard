import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Typography from "@mui/material/Typography";
import { mangoFusionPalette } from "@mui/x-charts/colorPalettes";
import { TimeSelector } from "../TimeSelector";
import { Box } from "@mui/material";
import { DropdownChecklist } from "../DropdownChecklist";
import { filterYears } from "../../utils";

const findMax = (arr) => {
  return `${Math.max(...arr.map(Number))}`;
};

const findMin = (arr) => {
  return `${Math.min(...arr.map(Number))}`;
};

export const BasicLineChart = ({
  data,
  title,
  hideSelector = false,
  hideLegendSelector = false,
  titleFont = null,
  legend = [],
  ...rest
}) => {
  const [startTime, setStartTime] = useState(findMin(Object.keys(data[0])));
  const [endTime, setEndTime] = useState(findMax(Object.keys(data[0])));
  const [xAxisArray, setXAxisArray] = useState([]);
  const [seriesArray, setSeriesArray] = useState([]);
  const [indexesToKeep, setIndexesToKeep] = useState([]);

  //check list
  const [checkList, setCheckList] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCheckList(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const newSeries = [];
    const keepIndexes = [];
    if (checkList.length) {
      checkList.forEach((dataTitle) => {
        const index = legend.indexOf(dataTitle);
        keepIndexes.push(index);
      });
      keepIndexes.forEach((index) => {
        const filtered = filterYears(data[index], startTime, endTime);
        newSeries.push({
          curve: "linear",
          data: Object.values(filtered),
          label: legend.length ? legend[index] : "",
        });
      });
      setSeriesArray(newSeries);
      setIndexesToKeep(keepIndexes);
    }
  }, [checkList]);

  useEffect(() => {
    if (data.length === 1) {
      const filtered = filterYears(data[0], startTime, endTime);
      setSeriesArray([{ curve: "linear", data: Object.values(filtered) }]);
      setXAxisArray(Object.keys(filtered));
    } else {
      const series = [];
      let xAxis;
      data.forEach((obj, i) => {
        if (indexesToKeep.includes(i) || indexesToKeep.length === 0) {
          const filtered = filterYears(obj, startTime, endTime);
          series.push({
            curve: "linear",
            data: Object.values(filtered),
            label: legend.length ? legend[i] : "",
          });
          xAxis = Object.keys(filtered);
        }
      });
      setSeriesArray(series);
      setXAxisArray(xAxis);
    }
  }, [startTime, endTime]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: hideSelector ? "center" : "space-between",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginTop: "20px",
            textAlign: "center",
            color: "#58595b",
            fontSize: titleFont ? titleFont : null,
          }}
        >
          <strong>{title}</strong>
        </Typography>
        <Box sx={{ display: "flex" }}>
          {legend.length && !hideLegendSelector ? (
            <DropdownChecklist
              titles={legend}
              checkList={checkList}
              handleChange={handleChange}
            />
          ) : null}
          {!hideSelector ? (
            <TimeSelector
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              options={Object.keys(data[0])}
            />
          ) : null}
        </Box>
      </Box>
      <LineChart
        xAxis={[
          {
            data: xAxisArray,
            valueFormatter: (value) => value.toString(),
          },
        ]}
        series={seriesArray}
        height={400}
        grid={{ vertical: false, horizontal: true }}
        colors={mangoFusionPalette}
        {...rest}
      />
    </>
  );
};
