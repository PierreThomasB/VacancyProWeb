import './styles/index.css';
import {Navigate, Route, HashRouter as Router, Routes} from "react-router-dom";
import {ObservedHome} from "./components/pages/Home.tsx";
import routes from "./routes.json";
import {ObservedAuthentication} from "./components/pages/Authentication.tsx";
import {ObservedContact} from "./components/pages/Contact.tsx";

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
          <Route exact path={routes.Contact} element={<ObservedContact/>}/>
      </Routes>
    </Router>
  );
}

export default App;
