import React, { useState } from "react";
import { AppBar, Box, Button } from "@mui/material";
import { display, height } from "@mui/material/node_modules/@mui/system";
// import { Loading } from "./Loading";
// import { Add } from "./Add";
// import { Edit } from "./Edit";
// import { Delete } from "./Delete";

export const MainWindow = (props) => {
    // const [shoppingList, setShoppingList] = useState([]);

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
                        <Button variant="contained"><span className="font-nunito Button-text">Add your first item</span></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};