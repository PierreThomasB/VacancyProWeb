import './styles/index.css';
import {Route, HashRouter as Router, Routes, Link} from "react-router-dom";
import {ObservedHome} from "./components/pages/Home.tsx";
import routes from "./routes.json";
import {ObservedAuthentication} from "./components/pages/Authentication.tsx";
import {PeriodDetailsObserver} from "./components/pages/PeriodDetails/PeriodDetails.tsx";
import {NewActivityObserver} from "./components/pages/NewActivity/NewActivity.tsx";
import {ObservedContact} from "./components/pages/Contact.tsx";
import About from "./components/pages/About.tsx";
import {sessionStore} from "./stores/SessionStore.ts";
import {NewPeriodObserver} from "./components/pages/NewPeriod/NewPeriod.tsx";
import {ShowPeriodObserver} from "./components/pages/ShowPeriod/ShowPeriod.tsx";
import PrivateRoute from "./PrivateRoutes.tsx";
import {PageNotFoundComp} from "./components/pages/PageNotFound.tsx";
import {EditActivityObs, EditActivityObserver} from "./components/pages/EditActivity/EditActivity.tsx";
import React from "react";

function App() {
  //const routes = require('./routes.json')




    const defaultProtectedRouteProps = {
        authenticationPath: '/login',
    };
    const checkIfUserIsAuthenticated = () => {
        return sessionStore.user !== null;
    }

  /*const AdminRoute = ({children}) => {
    if(!sessionStore.user.isAdmin) {
      return <Navigate to={routes.Home}/>
    } else {
      return children
    }
  }*/

  return (
    <Router>
      <Routes>
          <Route exact path={routes.Home} element={<ObservedHome/>}/>
          <Route exact path={routes.About} element={<About/>}/>
          <Route exact path={routes.Authentication} element={<ObservedAuthentication/>}/>
          <Route exact path={routes.Contact} element={<ObservedContact/>}/>
          <Route
              path={routes.NewActivity}
              element={<PrivateRoute outlet={<NewActivityObserver/>} />}

          />
          <Route
              path={routes.NewPeriod}
              element={<PrivateRoute outlet={<NewPeriodObserver/>} />}

          />
          <Route
              path={routes.Periods}
              element={<PrivateRoute outlet={<ShowPeriodObserver/>} />}

              />
          <Route
              path={routes.PerdiodDetails}
              element={<PrivateRoute outlet={<PeriodDetailsObserver/>} /> }
          />
          <Route
              path={routes.ActivityEdit}
              element={<PrivateRoute outlet={<EditActivityObserver/>} /> }
              />
             <Route outlet={<PageNotFoundComp/>} />
      </Routes>
    </Router>
  );
}

export default App;
