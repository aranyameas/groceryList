import React, { useEffect } from "react";
import { Backdrop, Box, Button, Modal } from "@mui/material";

export function Delete(props) {
  const item = props.item;
  const { deleteOpen } = props;
  const { setDeleteOpen } = props;
  const handleDeleteClose = () => setDeleteOpen(false);

  const handleDelete = () => {
    console.log("WHICH ONE: ", item)
    // fetch(process.env.REACT_APP_DELETE_ITEM_URL + "/" + item.item, {
    //   method: "DELETE",
    // }).then(() => console.log("Delete successful"));
    // handleDeleteClose();
    // window.location.reload(false);
  };

  return (
    <div>
      <Modal
        open={deleteOpen}
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
