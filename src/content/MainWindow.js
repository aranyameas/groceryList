import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Header } from "./Header";
import { EmptyList } from "./EmptyList";
import { Add } from "./Add";
import { Edit } from "./Edit";
import { Delete } from "./Delete";

export function MainWindow(props) {
  const [shoppingList, setShoppingList] = useState([
    {
      itemName: "Tomatoes",
      Description: "Walmart",
      Quantity: 5,
    },
    {
      itemName: "Tomatoes",
      Description: "Walmart",
      Quantity: 5,
    },
    {
      itemName: "Tomatoes",
      Description: "Walmart",
      Quantity: 5,
    },
  ]);
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);

  const [checked, setChecked] = useState([0]);

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

  if (!shoppingList) {
    return (
      <div>
        <Header />
        <Box className="Loading">
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (shoppingList.length === 0) {
    return (
      <div>
        <Header />
        <EmptyList />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="List-page">
        <div className="List-content">
          <div className="List-header">
            <span className="font-nunito Title">Your Items</span>
            <Button
              variant="contained"
              onClick={handleAddOpen}
              sx={{ backgroundColor: "#1871E8" }}
            >
              <span className="font-nunito Button-text">Add Item</span>
            </Button>
            <Add addOpen={addOpen} setAddOpen={setAddOpen} />
          </div>
          <List>
            {shoppingList.map((item, index) => {
              return (
                <ListItem key={item.itemName} disablePadding className="List">
                  <Button onClick={handleToggle(item.itemName)}>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(item.itemName) !== -1}
                      tabIndex={-1}
                      disableRipple
                      sx={{ color: "#C6C6C6" }}
                    />
                  </Button>
                  <ListItemText
                    primary={
                      <span className="font-nunito Item-text">
                        {item.itemName}
                      </span>
                    }
                    secondary={
                      <span className="font-nunito Description-text">
                        {item.Description}
                      </span>
                    }
                  />
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={handleEditOpen}
                  >
                    <CreateOutlinedIcon className="Edit-icon" />
                  </IconButton>
                  <Edit
                    editOpen={editOpen}
                    setEditOpen={setEditOpen}
                    checked={checked}
                    setChecked={setChecked}
                  />
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={handleDeleteOpen}
                  >
                    <DeleteOutlinedIcon className="Delete-icon" />
                  </IconButton>
                  <Delete
                    deleteOpen={deleteOpen}
                    setDeleteOpen={setDeleteOpen}
                  />
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </div>
  );
}
