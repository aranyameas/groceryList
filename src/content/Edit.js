import * as React from "react";
import { Modal, Slide, Box, Backdrop, Typography } from "@mui/material";

export const Edit = (props) => {
  const editOpen = props.editOpen;
  const setEditOpen = props.setEditOpen;
  const handleEditClose = () => setEditOpen(false);

  const handleEdit = () => {
    //Edit an item
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={editOpen}
      onClose={handleEditClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 5,
      }}
      className="Side-modal"
    >
      <Slide direction="left" in={editOpen}>
        <Box className="Modal">
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            asdfasdfasdfasdf
          </Typography>
        </Box>
      </Slide>
    </Modal>
  );
};
