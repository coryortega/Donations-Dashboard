import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export const TabsContainer = (props) => {  
  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        marginLeft: "25px",
        marginTop: "8px",
        height: "454px",
        width: "384px",
      }}
    >
      <Tabs
        value={props.value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{
          marginBottom: "31px"
        }}
        centered
      >
        {["2023", "2019 - 2023"].map((year, i) => {
          return <Tab label={year} value={year} key={i} />;
        })}
      </Tabs>
      {props.children}
    </Box>
  );
};
