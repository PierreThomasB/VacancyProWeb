// @ts-ignore
import React, {useState} from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';




export const PlaceInput  = ({updateLieu}) => {




    const [value,setValue ] = useState(null);



    const handleInputChange = (e) => {
        setValue(e);
        updateLieu(e.description);
    };

    return(


        <div>
            <GooglePlacesAutocomplete
                selectProps={{
                    value,
                    onChange: (e) => handleInputChange(e.value)
                }}

                apiKey="AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s"
            />
        </div>

    );



}