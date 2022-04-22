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
  const [quantity, setQuantity] = useState(1);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState({ desc: "" });
  const addOpen = props.addOpen;
  const setAddOpen = props.setAddOpen;
  const handleAddClose = () => setAddOpen(false);
  const charLimit = 100;

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: itemName,
      description: description.desc,
      quantity: quantity,
      delete: false,
      edit: false,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    fetch(process.env.REACT_APP_ADD_ITEM_URL, requestOptions)
      .then((response) => response.json())
      .then((response) => console.log("SUCCESS", JSON.stringify(response)))
      .catch((error) => console.error("Error:", error));

    handleAddClose();
    window.location.reload(false);
  };

  const handleItemChange = (event) => {
    setItemName(event.target.value);
  };

  const handleChange = (desc) => (event) => {
    setDescription({ ...description, [desc]: event.target.value });
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
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
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <TextField
                    name="itemName"
                    value={itemName}
                    label={<span className="font-nunito">Item Name</span>}
                    onChange={handleItemChange}
                    sx={{ marginBottom: "18px", marginX: "30px" }}
                  />
                  <TextField
                    multiline
                    rows={4}
                    name="description"
                    value={description.desc}
                    inputProps={{ maxLength: charLimit }}
                    FormHelperTextProps={{ className: "CharacterHelper-text" }}
                    helperText={`${description.desc.length}/${charLimit}`}
                    onChange={handleChange("desc")}
                    label={<span className="font-nunito">Description</span>}
                    sx={{ marginBottom: "14px", marginX: "30px" }}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="Quantity">
                      <span className="font-nunito HowMany-margin">
                        How Many?
                      </span>
                    </InputLabel>
                    <Select
                      name="quantity"
                      labelid="Quantity"
                      id="Quantity"
                      label={
                        <span className="font-nunito HowMany-margin">
                          How Many?
                        </span>
                      }
                      value={quantity}
                      onChange={handleQuantityChange}
                      sx={{ marginX: "30px" }}
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
                    <Button
                      variant="contained"
                      sx={{ width: "90px", marginRight: "20px" }}
                      type="submit"
                    >
                      <span className="font-nunito AddButton-text">
                        Add Task
                      </span>
                    </Button>
                  </div>
                </FormControl>
              </form>
            </div>
          </Box>
        </Slide>
      </Modal>
    </Backdrop>
  );
};
