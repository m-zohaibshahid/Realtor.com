import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import Logout from "views/Pages/Logout";
import SearchProperty from "views/Properties/Search";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Route path={`/logout`} component={Logout} />
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
