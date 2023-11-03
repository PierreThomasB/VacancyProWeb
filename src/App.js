import './styles/index.css';
import {Navigate, Route, HashRouter as Router, Routes} from "react-router-dom";
import {ObservedHome} from "./components/pages/Home.tsx";
import routes from "./routes.json";
import {ObservedAuthentication} from "./components/pages/Authentication.tsx";
import {NewPeriodObserver} from "./components/pages/NewPeriod/NewPeriod.tsx";
import {ObservedNavBar} from "./components/templates/NavBar.tsx";

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

    <Router>
      <Routes>
          <Route exact path={routes.Home} element={<ObservedHome/>}/>
          <Route exact path={routes.Authentication} element={<ObservedAuthentication/>}/>
          <Route exact path={routes.NewPeriod} element={<NewPeriodObserver/>} />
      </Routes>
    </Router>
  );
}

export default App;
