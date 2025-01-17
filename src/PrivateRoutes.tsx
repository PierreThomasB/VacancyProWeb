import { Navigate} from "react-router-dom";
// @ts-ignore
import React from "react";



export type PrivateRouteProps = {

    outlet: Element;
};


export default function PrivateRoute({ outlet}: PrivateRouteProps) : React.JSX.Element{


    return localStorage.getItem('VacancyProUser')  === null ?
        <Navigate to={'/Authentication'}/> : outlet ;

}

