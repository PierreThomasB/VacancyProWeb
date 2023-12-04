import {Link, Navigate, Route} from "react-router-dom";
// @ts-ignore
import React from "react";



export type PrivateRouteProps = {

    outlet: Element;
};


export default function PrivateRoute({ outlet}: PrivateRouteProps) : React.JSX.Element{


    return sessionStorage.getItem('user') ?
        <Navigate to={'/403'}/> : outlet ;

}
