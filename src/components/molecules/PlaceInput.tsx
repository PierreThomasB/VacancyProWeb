// @ts-ignore
import React from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';




export const PlaceInput  = ({updateLieu}) => {




    return(


        <div>
            <GooglePlacesAutocomplete
                placeholder="Entrez le lieux"
                onPress={(data, details = null) => {
                   updateLieu(data);
                }}
                apiKey="AIzaSyAeX0rGP22Zfco3WbT44TFHbKxqmPmIK_s"
            />
        </div>

    );



}