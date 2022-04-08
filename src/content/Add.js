import React, { useState } from "react";
import { Modal, Slide, Box, Backdrop, Typography } from "@mui/material";

const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

export const Add = (props) => {
    const addOpen = props.addOpen;
    const [setAddOpen] = useState(false);
    const handleAddClose = () => setAddOpen(false);

    return(
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={addOpen}
            onClose={handleAddClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 5,
            }}
        >
            <Slide direction="left" in={addOpen}>
            <Box sx={style}>
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