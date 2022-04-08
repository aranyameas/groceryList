import React, { useState } from "react";
import { Button } from "@mui/material";
import { Add } from "./Add";

export const EmptyList = (props) => {
    const [addOpen, setAddOpen] = useState(false);
    const handleAddOpen = () => setAddOpen(true);

    return (
        <div className="Empty-page"> 
            <div className="Empty-box">
                <div className="Empty-content">
                    <span className="Empty-text font-nunito"> Your shopping list is empty :(</span>
                    <Button variant="contained" onClick={handleAddOpen}><span className="font-nunito Button-text">Add your first item</span></Button>
                    <Add addOpen={addOpen} />
                </div>
            </div>
        </div> 
    );
};