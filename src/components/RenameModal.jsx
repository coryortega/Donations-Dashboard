import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const RenameModal = ({
  isRenaming,
  setIsRenaming,
  name,
  columns,
  setColumns,
  currentFile
}) => {
  const handleClose = () => setIsRenaming(false);
  const handleRename = (newName) => {
    const columnNames = columns[currentFile];
    const index = columnNames.indexOf(name);
    columnNames.splice(index, 1, newName);
    setColumns({...columnNames, [currentFile]: columnNames});
  };

  return (
    <div>
      <Modal
        open={isRenaming}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Rename column
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="Rename"
              variant="filled"
              defaultValue={name}
            />
          </Typography>
          <Button variant="outlined" color="success" onClick={handleRename}>
            Rename
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ marginLeft: "10px" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
