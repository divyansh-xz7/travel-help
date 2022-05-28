import React from "react";

import {CssBaseline , Grid} from "@material-ui/core";


import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import { useState, useEffect } from "react";
import { getPlacesData, getWeatherData } from "./api";

const App = () =>{
    
    const [places,setPlaces] = useState([]);
    const [bounds,setBounds] = useState({});
    const [coordinates,setCoordinates] = useState({});
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type,setType]=useState('restaurants');
    const [rating,setRating]=useState(0);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [weatherData,setWeatherData] = useState([]);

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude, lng:longitude});
        })
    },[]);

    useEffect(()=>{
        if (bounds.sw && bounds.ne)
        {
            setIsLoading(true);
            getWeatherData(coordinates.lat,coordinates.lng).then((data)=>{
                setWeatherData(data);
            });
            
            getPlacesData(type, bounds.sw,bounds.ne).then((data)=>{
                setPlaces(data?.filter((place)=>place.name && place.num_reviews>0));
                setFilteredPlaces([]);
                setIsLoading(false);
            })
        }
    },[type,bounds]);

    useEffect(()=>{
        const filtered=places?.filter((place)=>place.rating>=rating);
        setFilteredPlaces(filtered);
    },[rating]);

    return (
        <>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={4} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                places={rating!==0? filteredPlaces: places} 
                childClicked={childClicked} 
                isLoading={isLoading}
                type={type} 
                setType={setType} 
                rating={rating} 
                setRating={setRating} />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map 
                setBounds={setBounds} 
                setCoordinates={setCoordinates} 
                coordinates={coordinates} 
                places={filteredPlaces.length? filteredPlaces: places}  
                setChildClicked={setChildClicked}
                weatherData={weatherData} />
            </Grid>
        </Grid>

        </>
    )
}

export default App;