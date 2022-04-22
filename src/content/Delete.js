import React, { useEffect } from "react";
import { Backdrop, Box, Button, Modal } from "@mui/material";

export function Delete(props) {
  const item = props.item;
  // const { deleteOpen } = props.deleteOpen;
  // const setDeleteOpen = props.setDeleteOpen;
  const shoppingList = props.shoppingList;
  const setShoppingList = props.setShoppingList;

  const handleDeleteClose = () => {
    const res = shoppingList.map((s) =>
      s.name === item.name ? { ...s, delete: false } : s
    );
    setShoppingList([...res]);
  };

  const handleDelete = () => {
    fetch(process.env.REACT_APP_DELETE_ITEM_URL + "/" + item.name, {
      method: "DELETE",
    }).then(() => console.log("Delete successful"));
    handleDeleteClose();
    window.location.reload(false);
  };

  return (
    <div>
      <Modal
        open={item.delete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 5,
        }}
      >
        <Box className="Delete-modal">
          <span className="Delete-title font-nunito">Delete Item?</span>
          <span className="Delete-text font-nunito">
            Are you sure you want to delete this item? This can not be undone.
          </span>
          <div className="Modal-buttons">
            <Button
              variant="text"
              sx={{ right: "30px" }}
              onClick={handleDeleteClose}
            >
              <span className="Cancel font-nunito">Cancel</span>
            </Button>
            <Button
              variant="contained"
              sx={{ right: "30px" }}
              onClick={handleDelete}
            >
              <span className="font-nunito">Delete</span>
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
