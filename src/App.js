import './styles/index.css';
import {Navigate, Route, HashRouter as Router, Routes} from "react-router-dom";
import {ObservedHome} from "./components/pages/Home.tsx";
import {NewPeriodObserver} from "./components/pages/NewPeriod/NewPeriod.tsx";
import React from "react";



function App() {
  const routes = require('./routes.json')
  /*const AuthenticatedRoute = ({children}) => {
    if (!sessionStore.user) {
      // This way we could give to authentication a callback to redirect to the page the user wanted to access
      return <Navigate to={routes.Authentication}/>
    } else {
      return children
    }
  }

  const AdminRoute = ({children}) => {
    if(!sessionStore.user.isAdmin) {
      return <Navigate to={routes.Home}/>
    } else {
      return children
    }
  }*/

  return (

      <React.Fragment>
    
        <Router>
          <Routes>
              <Route exact path={routes.Home} element={<ObservedHome/>}/>
              <Route exact path={routes.NewPeriod} element={<NewPeriodObserver/>} />
          </Routes>
        </Router>

      </React.Fragment>
   
  );
}

export default App;
