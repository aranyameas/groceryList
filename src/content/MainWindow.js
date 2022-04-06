import React, { useState } from "react";
import { AppBar, Backdrop, Box, Button, Slide, Modal, Typography } from "@mui/material";
import { display, height } from "@mui/material/node_modules/@mui/system";
// import { Loading } from "./Loading";
// import { Add } from "./Add";
// import { Edit } from "./Edit";
// import { Delete } from "./Delete";

const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const MainWindow = (props) => {
    // const [shoppingList, setShoppingList] = useState([]);
    const [addOpen, setAddOpen] = useState(false);
    const handleAddOpen = () => setAddOpen(true);
    const handleAddClose = () => setAddOpen(false);

    // const addItem = () => {

    // }

    // const editItem = () => {

    // }

    // const deleteItem = () => {

    // }

    return (
        <div>
            <AppBar className={"App-header"}>
                <span className={"Header-title font-dosis"}>SHOPPING LIST</span>
            </AppBar>
            
            <div className="Empty-page">
                <div className="Empty-box">
                    <div className="Empty-content">
                        <span className="Empty-text font-nunito"> Your shopping list is empty :(</span>
                        <Button variant="contained" onClick={handleAddOpen}><span className="font-nunito Button-text">Add your first item</span></Button>
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
                    </div>
                </div>
            </div>
        </div>
    );
};