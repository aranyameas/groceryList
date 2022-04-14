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
import { Description, LastPageOutlined } from "@mui/icons-material";

export const Add = (props) => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState({ desc: "" });
  const addOpen = props.addOpen;
  const setAddOpen = props.setAddOpen;
  const handleAddClose = () => setAddOpen(false);
  const charLimit = 100;

  const handleAdd = () => {
    //Add an item
  };

  const handleChange = (desc) => (event) => {
    setDescription({ ...description, [desc]: event.target.value });
  };

  return (
    <Backdrop>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={addOpen}
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
                <TextField
                  label={<span className="font-nunito">Item Name</span>}
                />
                <TextField
                  multiline
                  rows={4}
                  value={description.desc}
                  inputProps={{ maxLength: charLimit }}
                  helperText={`${description.desc.length}/${charLimit}`}
                  onChange={handleChange("desc")}
                  label={<span className="font-nunito">Description</span>}
                />
                <FormControl fullWidth>
                  <InputLabel id="Quantity">
                    <span className="font-nunito">How Many?</span>
                  </InputLabel>
                  <Select
                    labelid="Quantity"
                    id="Quantity"
                    label={<span className="font-nunito">How Many?</span>}
                    value={amount}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <div className="Modal-buttons">
                  <Button variant="text" onClick={handleAddClose}>
                    <span className="Cancel font-nunito">Cancel</span>
                  </Button>
                  <Button variant="contained" onClick={handleAdd}>
                    <span className="font-nunito">Add Task</span>
                  </Button>
                </div>
              </FormControl>
            </div>
          </Box>
        </Slide>
      </Modal>
    </Backdrop>
  );
};
