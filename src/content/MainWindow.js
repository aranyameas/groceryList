import React, { useState } from "react";
import { AppBar, Backdrop, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CircularProgress, Checkbox, Slide, Modal, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Header } from "./Header";
import { EmptyList } from "./EmptyList";
import { Add } from "./Add";
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
    const [addOpen, setAddOpen] = useState(false);

    const handleAddOpen = () => setAddOpen(true);

    const [checked, setChecked] = React.useState([0]);

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
                        <Button variant="contained" onClick={handleAddOpen}><span className="font-nunito Button-text">Add Item</span></Button>
                        <Add addOpen={addOpen}/>
                    </div>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                        <ListItem
                            key={value}
                            secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                                <CommentIcon />
                            </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                    </List>
                </div>
            </div>
        </div>
    );
};