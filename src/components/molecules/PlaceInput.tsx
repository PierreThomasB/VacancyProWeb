// @ts-ignore
import React, {useState} from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Place from "../../models/Place.ts";
const config = require('../../config.json');




export const PlaceInput  = ({updateLieu}) => {

    const [value,setValue ] = useState("");
    const apiKey = config.GoogleAPiKey;

    const handleInputChange = (e) => {

        let place :Place = new Place(e.description , e.place_id);
        updateLieu(place)
    };

    return(


        <div>
            <GooglePlacesAutocomplete
                selectProps={{
                    value,
                    onChange: (e) => {
                        console.log(e);
                        handleInputChange(e.value);
                        setValue(e);
                    }
                }}

                apiKey={apiKey}
            />
        </div>

    );



}