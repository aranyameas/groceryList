import React, { useState } from "react";
import { AppBar, Backdrop, Box, Button, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Checkbox, Slide, Modal, Typography } from "@mui/material";
import { Header } from "./Header";
import { EmptyList } from "./EmptyList";
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
    const [shoppingList, setShoppingList] = useState([
    {
        "Item Name": "Tomatoes",
        "Description": "Walmart",
        "Quantity": 5
    }
]);

    // const addItem = () => {

    // }

    // const editItem = () => {

    // }

    // const deleteItem = () => {

    // }
    console.log(shoppingList);

    if(!shoppingList)
    return(
        <div>
            <Header />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
                <CircularProgress />
            </Box>
        </div>
        
    )

    if(shoppingList.length === 0)
    return(
        <div>
            <Header />
            <EmptyList />
        </div>
        
    )

    return (
        <div>
            <Header />
            <div className="List-page">
                <div className="List-content">
                    <div className="List-header">
                        <span className="font-nunito Title">Your Items</span>
                        <Button variant="contained"><span className="font-nunito Button-text">Add Item</span></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};