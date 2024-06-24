import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

export const TimeSelector = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  options,
}) => {
  const handleStartChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndChange = (event) => {
    setEndTime(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "10px",
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">From</InputLabel>
        <Select value={startTime} label="From" onChange={handleStartChange}>
          {options.map((option, i) => {
            return (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <HorizontalRuleIcon htmlColor={"#c4c4c4"}/>
      </Box>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">To</InputLabel>
        <Select value={endTime} label="To" onChange={handleEndChange}>
          {options.map((option, i) => {
            return (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
