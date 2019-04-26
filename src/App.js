import React from "react";
import { Route, Switch } from "react-router-dom";
import People from "./components/people";
import NoMatch from "./components/NoMatch";

const App = () => (
  <Switch>
    <Route exact path="/" component={People} />
    <Route component={NoMatch} />
  </Switch>
);

export default App;
