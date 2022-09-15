import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "../routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <div className="flex">
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Switch>
          {isLoggedIn ? (
            <div className="w-1/3">
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
            </div>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
