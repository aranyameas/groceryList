import React from "react";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

export const MainWindow = () => {
    return (
        <Box>
            <AppBar className={"App-header"}>
                <span className={"Header-title font-dosis"}>SHOPPING LIST</span>
            </AppBar>
        </Box>
    );
}