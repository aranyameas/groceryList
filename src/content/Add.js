import React, { useState } from "react";
import {
  TextField,
  Button,
  Modal,
  Slide,
  Box,
  Backdrop,
  Select,
  IconButton,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LastPageOutlined } from "@mui/icons-material";

export const Add = (props) => {
  const [amount, setAmount] = useState(0);
  const addOpen = props.addOpen;
  const setAddOpen = props.setAddOpen;
  const handleAddClose = () => setAddOpen(false);

  const handleAdd = () => {
    //Add an item
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={addOpen}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 5,
      }}
      className="Side-modal"
    >
      <Slide direction="left" in={addOpen}>
        <Box className="Modal">
          <div className="Add-contents">
            <div className="AddEdit-header">
              <span className="font-dosis AddEdit-shoppinglist-text">
                SHOPPING LIST
              </span>
              <IconButton onClick={handleAddClose}>
                <LastPageOutlined />
              </IconButton>
            </div>
            <span className="font-nunito AddEdit-subtext">Add an Item</span>
            <span className="font-nunito AddEdit-subsubtext">
              Add your new item below
            </span>
            <FormControl fullWidth>
              <TextField label="Item Name" className="Margin-1"></TextField>
              <TextField label="Description"></TextField>
              <Select label="How many?" value={amount}>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
              <div className="Modal-buttons">
                <Button variant="text" onClick={handleAddClose}>
                  <span className="Cancel font-nunito">Cancel</span>
                </Button>
                <Button variant="contained">
                  <span className="font-nunito">Add Task</span>
                </Button>
              </div>
            </FormControl>
          </div>
        </Box>
      </Slide>
    </Modal>
  );
};
