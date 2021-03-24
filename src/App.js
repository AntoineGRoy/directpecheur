import React, { useEffect, useState, useMemo } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Etal from "./pages/Etal";
import Signup from "./pages/Signup";
import { auth } from "./firebase";
import { UserContext } from "./usercontext";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !authenticated ? <Component {...props} /> : <Redirect to="etal" />
      }
    />
  );
}
function App() {
  const [authenticated, setAuthenticated] = useState({
    loggedin: false,
    loading: true
  });
  const [userInfos, setUserInfos] = useState({
    email: "",
    imageUrl: "",
    username: ""
  });
  const providerValue = useMemo(() => ({ userInfos, setUserInfos }), [
    userInfos,
    setUserInfos
  ]);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated({
          loggedin: true,
          loading: false
        });
      } else {
        setAuthenticated({
          loggedin: false,
          loading: false
        });
      }
    });
  }, []);
  return (
    <Router>
      <Switch>
        <UserContext.Provider value={providerValue}>
          <Route exact path="/" component={Home}></Route>
          <PrivateRoute
            path="/etal"
            authenticated={authenticated.loggedin}
            component={Etal}
          ></PrivateRoute>
          
          <PublicRoute
            path="/signup"
            authenticated={authenticated.loggedin}
            component={Signup}
          ></PublicRoute>
          <PublicRoute
            path="/login"
            authenticated={authenticated.loggedin}
            component={Login}
          ></PublicRoute>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
