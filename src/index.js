import React from 'react';
import App from './App';
import {createRoot} from "react-dom/client";
import config from "./config.json";
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = createRoot(document.getElementById('root'))
root.render(
    <GoogleOAuthProvider clientId={config.GoogleClientID}>
        <App tab="home"/>
    </GoogleOAuthProvider>
)




