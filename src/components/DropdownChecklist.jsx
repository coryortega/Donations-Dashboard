import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const DropdownChecklist = ({
  titles,
  checkList,
  handleChange,
}) => {
  return (
    <div style={{ marginTop: "10px" }}>
      <FormControl sx={{ m: 1, width: 200 }} size="small">
        <InputLabel id="demo-multiple-checkbox-label">Data</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={checkList}
          onChange={handleChange}
          input={<OutlinedInput label="Data" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {titles.map((title) => (
            <MenuItem key={title} value={title}>
              <Checkbox checked={checkList.indexOf(title) > -1} />
              <ListItemText primary={title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
