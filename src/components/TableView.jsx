import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "./CustomNoRowsOverlay";
import { RenameColumn } from "./RenameColumn";
import { RenameModal } from "./RenameModal";
import { useGridApiRef } from "@mui/x-data-grid";

export const TableView = ({
  columns = [],
  values = [],
  setColumns,
  currentFile,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [columnNameToRename, setColumnNameToRename] = useState("");
  const apiRef = useGridApiRef();

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        apiRef={apiRef}
        rows={values}
        columns={columns}
        initialState={{
          density: 'compact',
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        slots={{
          toolbar: values.length ? GridToolbar : null,
          noRowsOverlay: CustomNoRowsOverlay,
          columnMenu: (props) => (
            <RenameColumn
              {...props}
              setIsRenaming={setIsRenaming}
              setColumnNameToRename={setColumnNameToRename}
            />
          ),
        }}
        sx={{ "--DataGrid-overlayHeight": "300px" }}
      />
      <RenameModal
        isRenaming={isRenaming}
        setIsRenaming={setIsRenaming}
        name={columnNameToRename}
        columns={columns}
        setColumns={setColumns}
        currentFile={currentFile}
      />
    </Box>
  );
};
