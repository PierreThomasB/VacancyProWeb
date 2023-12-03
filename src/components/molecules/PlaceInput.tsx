// @ts-ignore
import React, {useState} from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Place from "../../models/Place.ts";




export const PlaceInput  = ({updateLieu}) => {




    const [value,setValue ] = useState("");



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

                apiKey="AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s"
            />
        </div>

    );



}