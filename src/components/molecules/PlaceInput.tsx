// @ts-ignore
import React, {useState} from "react";
import {Input} from "@mui/material";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';




export const PlaceInput  = () => {




    return(


        <div>
            <GooglePlacesAutocomplete
                apiKey="AIzaSyBps0FIYeTMYkzhg7KjTjl66nc3ZmlnoFM"
            />
        </div>

    );



}