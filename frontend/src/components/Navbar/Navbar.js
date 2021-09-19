import React from "react";
import { AppBar,Typography,Tabs,Tab, Toolbar } from "@material-ui/core";


const Navbar = ()=> {
    
    return (
        <>
            <AppBar>
                <Toolbar>
                <Typography>Project</Typography>
                <Tabs>
                    <Tab label='Home'></Tab>
                </Tabs>
                <Tabs>
                    <Tab label='Data'></Tab>
                </Tabs>
                <Tabs>
                    <Tab label='Tasks'></Tab>
                </Tabs>
                <Tabs>
                    <Tab label='Dashboard'></Tab>
                </Tabs>
                <Tabs>
                    <Tab label='Help'></Tab>
                </Tabs>
                <Tabs>
                    <Tab label='Setting'></Tab>
                </Tabs>
                
                
                               
                </Toolbar>

            </AppBar>
        </>
    )
}

export default Navbar;                   
