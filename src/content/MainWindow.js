import React, { useState } from "react";
import { AppBar, Box, Button, FormControlLabel, Paper, Slide } from "@mui/material";
import { display, height } from "@mui/material/node_modules/@mui/system";
// import { Loading } from "./Loading";
// import { Add } from "./Add";
// import { Edit } from "./Edit";
// import { Delete } from "./Delete";

export const MainWindow = (props) => {
    // const [shoppingList, setShoppingList] = useState([]);
    const [addOpen, setAddOpen] = React.useState(false);

    const addItem = (
        <Paper sx={{ m: 1 }} elevation={4}><span>asdfas</span> </Paper>
    );

    const handleClick = () => {
        setAddOpen(true);
    }

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
                        <FormControlLabel
                            control={<Button variant="contained" onClick={handleClick}><span className="font-nunito Button-text">Add your first item</span></Button>} />
                        <Slide direction="left" in={addOpen} mountOnEnter unmountOnExit>
                            {addItem}
                        </Slide>
                    </div>
                </div>
            </div>
        </div>
    );
};