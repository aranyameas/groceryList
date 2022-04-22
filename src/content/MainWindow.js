import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Header } from "./Header";
import { EmptyList } from "./EmptyList";
import { Add } from "./Add";
import { Edit } from "./Edit";
import { Delete } from "./Delete";

var test = {};

export function MainWindow(props) {
  const [shoppingList, setShoppingList] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const [editOpen, setEditOpen] = useState(false);
  const [checked, setChecked] = useState([0]);

  useEffect(() => {
    getShoppingList();
  }, []);

  function getShoppingList() {
    fetch(process.env.REACT_APP_GET_ITEMS_URL)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setShoppingList(JSON.parse(data).items);
      });
  }

  function Purchased(props) {
    const name = props.name;
    const description = props.description;
    const quantity = props.quantity;
    return (
      <ListItemText
        primary={
          <span className="font-nunito PurchasedItem-text">
            {name + " - " + quantity}
          </span>
        }
        secondary={
          <span className="font-nunito PurchasedDescription-text">
            {description}
          </span>
        }
      />
    );
  }

  function NotPurchased(props) {
    const name = props.name;
    const description = props.description;
    const quantity = props.quantity;
    return (
      <ListItemText
        primary={
          <span className="font-nunito Item-text">
            {name + " - " + quantity}
          </span>
        }
        secondary={
          <span className="font-nunito Description-text">{description}</span>
        }
      />
    );
  }

  function CheckPurchased(props) {
    const isPurchased = props.isPurchased;
    const name = props.name;
    const description = props.description;
    const quantity = props.quantity;
    if (isPurchased) {
      return (
        <Purchased name={name} description={description} quantity={quantity} />
      );
    }
    return (
      <NotPurchased name={name} description={description} quantity={quantity} />
    );
  }

  const handleDeleteOpen = (item) => {
    // const newList = shoppingList
    const res = shoppingList.map((s) =>
      s.name === item ? { ...s, delete: true } : s
    );
    // newList.items = res
    setShoppingList([...res]);
  };

  const handleEditOpen = (item) => {
    // const newList = shoppingList
    const res = shoppingList.map((s) =>
      s.name === item ? { ...s, edit: true } : s
    );
    // newList.items = res
    setShoppingList([...res]);
  };

  const handleToggle = (item) => {
    const res = shoppingList.map((s) =>
      s.name === item ? { ...s, purchased: !s.purchased } : s
    );
    setShoppingList([...res]);
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
                <ListItem key={item.name} disablePadding className="List">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.purchased}
                        onChange={() => handleToggle(item.name)}
                        name="purchased"
                        sx={{ marginLeft: "21px", color: "#C6C6C6C6" }}
                      />
                    }
                  />
                  <CheckPurchased
                    isPurchased={item.purchased}
                    name={item.name}
                    description={item.description}
                    quantity={item.quantity}
                  />
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleEditOpen(item.name)}
                  >
                    <CreateOutlinedIcon className="Edit-icon" />
                  </IconButton>
                  <Edit
                    editOpen={item.edit}
                    shoppingList={shoppingList}
                    item={item}
                    setShoppingList={setShoppingList}
                    checked={checked}
                    setChecked={setChecked}
                  />
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleDeleteOpen(item.name)}
                  >
                    <DeleteOutlinedIcon className="Delete-icon" />
                  </IconButton>
                  <Delete
                    deleteOpen={item.delete}
                    shoppingList={shoppingList}
                    item={item}
                    setShoppingList={setShoppingList}
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
