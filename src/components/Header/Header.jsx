import React from "react";
import { useState } from "react";
import {Autocomplete} from "@react-google-maps/api";
import { Toolbar, AppBar, Typography, Box, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from './styles';

const Header = ({setCoordinates}) =>{
    const classes=useStyles();
    const [autocomplete, setautocomplete]= useState(null);

    const onLoad = (autoC)=>setautocomplete(autoC);

    const onPlaceChanged =()=>{
        const lat=autocomplete.getPlace().geometry.location.lat();
        const lng=autocomplete.getPlace().geometry.location.lng();
        console.log(lng+''+lat);
        setCoordinates({lat,lng});
    }

    return (
        <>
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    TravHelP
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder="Search... " classes={{root:classes.inputRoot, input:classes.inputInput}}/>
                        </div>
                    </Autocomplete>

                </Box>
            </Toolbar>
        </AppBar>
        </>
    );
}

export default Header;