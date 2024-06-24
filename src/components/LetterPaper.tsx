import React from "react";
import { Paper } from "@mui/material";
import { useMediaQuery } from '@mui/material';

export const LetterPaper = (props) => {
  const isPrint = useMediaQuery('print');

  return (
    <Paper
      square
      elevation={isPrint ? 0 : 3}
      sx={{
        height: props.isLandscape ? "8.5in" : "11in",
        width: props.isLandscape ? "11in" : "8.5in",
        marginTop: props.isFirst || isPrint ? "0px" : "15px"
      }}
    >
      {props.children}
    </Paper>
  );
};
