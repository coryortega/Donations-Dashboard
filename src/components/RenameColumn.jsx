import { GridColumnMenu } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const RenameColumnComponent = (props) => {
  const { myCustomHandler, myCustomValue } = props;
  return (
    <MenuItem onClick={myCustomHandler}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>{myCustomValue}</ListItemText>
    </MenuItem>
  );
};

const handleRename = (columnName, setIsRenaming, setColumnNameToRename) => {
  setIsRenaming(true);
  setColumnNameToRename(columnName);
};

export const RenameColumn = (props) => {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuUserItem: RenameColumnComponent,
      }}
      slotProps={{
        columnMenuUserItem: {
          displayOrder: 1,
          myCustomValue: "Rename column",
          myCustomHandler: () => {
            handleRename(
              props.colDef.field,
              props.setIsRenaming,
              props.setColumnNameToRename
            );
          },
        },
      }}
    />
  );
};
