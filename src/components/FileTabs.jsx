import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export const FileTabs = ({ fileNames, tabChangeHandler }) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    tabChangeHandler(fileNames[newValue - 1])
  };

  React.useEffect(() => {
    handleChange(null, fileNames.length)
  }, [fileNames])

  return (
    <Box sx={{ width: "70%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
      >
        {fileNames.map((file, i) => {
          return <Tab label={file} value={i + 1} key={i} />;
        })}
      </Tabs>
    </Box>
  );
};
