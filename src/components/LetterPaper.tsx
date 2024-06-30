import React from "react";
import { Paper } from "@mui/material";

export const LetterPaper = (props, isFirst=false) => {
  return (
    <Paper
      square
      elevation={0}
      className={isFirst ? "" : "is-not-first"}
      sx={{
        height: props.isLandscape ? "8.5in" : "11in",
        width: props.isLandscape ? "11in" : "8.5in",
        marginTop: props.isFirst ? "0px" : "15px",
        marginBottom: "0px"
      }}
    >
      {props.children}
    </Paper>
  );
};
