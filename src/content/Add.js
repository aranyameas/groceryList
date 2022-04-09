import * as React from "react";
import { Modal, Slide, Box, Backdrop, Typography } from "@mui/material";

export const Add = (props) => {
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
      onClose={handleAddClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 5,
      }}
      className="Side-modal"
    >
      <Slide direction="left" in={addOpen}>
        <Box className="Modal">
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Slide>
    </Modal>
  );
};
