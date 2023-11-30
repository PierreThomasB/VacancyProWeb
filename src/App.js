import './styles/index.css';
import {Navigate, Route, HashRouter as Router, Routes} from "react-router-dom";
import {ObservedHome} from "./components/pages/Home.tsx";
import routes from "./routes.json";
import {ObservedAuthentication} from "./components/pages/Authentication.tsx";
import {NewPeriodObserver} from "./components/pages/NewPeriod/NewPeriod.tsx";
import {ShowPeriodObserver} from "./components/pages/ShowPeriod/ShowPeriod.tsx";
import {PeriodDetailsObserver} from "./components/pages/PeriodDetails/PeriodDetails.tsx";
import {NewActivityObserver} from "./components/pages/NewActivity/NewActivity.tsx";
import {ObservedContact} from "./components/pages/Contact.tsx";
import About from "./components/pages/About.tsx";
import {sessionStore} from "./stores/SessionStore.ts";

function App() {
  //const routes = require('./routes.json')
  const AuthenticatedRoute = ({children}) => {
    if (!sessionStore.user) {
      // This way we could give to authentication a callback to redirect to the page the user wanted to access
      return children
    } else {
      return children
    }
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

          <Route exact path={routes.NewPeriod} element={
                <AuthenticatedRoute>
                    <NewPeriodObserver/>
                </AuthenticatedRoute>
          }/>
          <Route exact path={routes.Periods} element={
                <AuthenticatedRoute>
                    <ShowPeriodObserver/>
                </AuthenticatedRoute>
          } />
          <Route exact path={routes.PerdiodDetails} element={
                <AuthenticatedRoute>
                    <PeriodDetailsObserver/>
                </AuthenticatedRoute>
          } />
          <Route exact path={routes.NewActivity} element={
                <AuthenticatedRoute>
                    <NewActivityObserver/>
                </AuthenticatedRoute>
          } />

      </Routes>
    </Router>
  );
}

export default App;
