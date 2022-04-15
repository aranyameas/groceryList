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
  Checkbox,
} from "@mui/material";
import { LastPageOutlined } from "@mui/icons-material";

export const Edit = (props) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState({ desc: "" });
  const editOpen = props.editOpen;
  const setEditOpen = props.setEditOpen;
  const handleEditClose = () => setEditOpen(false);
  const checked = props.checked;
  const setChecked = props.setChecked;
  const [value, setValue] = useState(false);
  const charLimit = 100;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleChange = (desc) => (event) => {
    setDescription({ ...description, [desc]: event.target.value });
  };

  const handleEdit = () => {
    //Edit an item
  };

  {
    return (
      <Backdrop>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={editOpen}
          className="Side-modal"
        >
          <Slide direction="left" in={editOpen}>
            <Box className="Modal">
              <div className="Add-contents">
                <div className="AddEdit-header">
                  <span className="font-dosis AddEdit-shoppinglist-text">
                    SHOPPING LIST
                  </span>
                  <IconButton onClick={handleEditClose}>
                    <LastPageOutlined />
                  </IconButton>
                </div>
                <span className="font-nunito AddEdit-subtext">
                  Edit an Item
                </span>
                <span className="font-nunito AddEdit-subsubtext">
                  Edit your item below
                </span>
                <FormControl fullWidth>
                  <TextField
                    label={<span className="font-nunito">Item Name</span>}
                    sx={{ marginBottom: "18px", marginX: "30px" }}
                  />
                  <TextField
                    multiline
                    rows={4}
                    value={description.desc}
                    inputProps={{ maxLength: charLimit }}
                    helperText={`${description.desc.length}/${charLimit}`}
                    onChange={handleChange("desc")}
                    label={<span className="font-nunito">Description</span>}
                    FormHelperTextProps={{ className: "CharacterHelper-text" }}
                    sx={{ marginBottom: "14px", marginX: "30px" }}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="Quantity">
                      <span className="font-nunito HowMany-margin">
                        How Many?
                      </span>
                    </InputLabel>
                    <Select
                      labelid="Quantity"
                      id="Quantity"
                      label={
                        <span className="font-nunito HowMany-margin">
                          "How many?"
                        </span>
                      }
                      sx={{ marginX: "30px" }}
                      value={amount}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    sx={{ justifyContent: "flex-start" }}
                    onClick={handleToggle(value)}
                  >
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      //inputProps={{ "aria-labelledby": labelId }}
                      sx={{ color: "#C6C6C6" }}
                    />{" "}
                    <span className="Purchased font-nunito">Purchased</span>
                  </Button>
                  <div className="Modal-buttons">
                    <Button variant="text" onClick={handleEditClose}>
                      <span className="Cancel font-nunito">Cancel</span>
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ width: "90px", marginRight: "20px" }}
                    >
                      <span className="font-nunito EditButton-text">
                        Save Item
                      </span>
                    </Button>
                  </div>
                </FormControl>
              </div>
            </Box>
          </Slide>
        </Modal>
      </Backdrop>
    );
  }
};
