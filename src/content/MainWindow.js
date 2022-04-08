import React, { useState } from "react";
import { AppBar, Backdrop, Box, Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CircularProgress, Checkbox, Slide, Modal, Typography } from "@mui/material";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Header } from "./Header";
import { EmptyList } from "./EmptyList";
import { Add } from "./Add";
// import { Edit } from "./Edit";
// import { Delete } from "./Delete";

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

    const handleEdit = () => {
        //Edit an item
    }

    const handleDelete = () => {
        //Delete an item
    }

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
                        <Button variant="contained" onClick={handleAddOpen} sx={{backgroundColor:"#1871E8"}}><span className="font-nunito Button-text">Add Item</span></Button>
                        <Add addOpen={addOpen}/>
                    </div>
                    <List>
                        {[0, 1, 2, 3].map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                        <ListItem
                            key={value}
                            secondaryAction={
                                <div>
                                     <IconButton edge="end" aria-label="comments" onClick={handleEdit}>
                                        <CreateOutlinedIcon sx={{color: "#555F7C"}} />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="comments" onClick={handleDelete}>
                                        <DeleteOutlinedIcon sx={{color: "#555F7C"}} />
                                    </IconButton>
                                </div>
                           
                            }
                            disablePadding
                            sx= {{border: 1, margin: "12px", borderRadius: 1, borderColor: "#D5DFE9"}}
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                sx={{color:"#C6C6C6"}}
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