import React, { Component } from "react";
import "./assets/scss/index.scss";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";

// COMPONENTS
import Navbar from "./components/layout/navbar/Navbar";
import Alert from "./components/layout/alert/Alert";
import Landing from "./components/layout/landing/Landing";
import Register from "./components/auth/register/Register";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile/create_profile/CreateProfile";
import ActiveProfile from "./components/profile/active_profile/ActiveProfile";
import UpdateProfile from "./components/profile/update_profile/UpdateProfile";
import CreateExperience from "./components/profile/create_experience/CreateExperience";
import UpdateExperience from "./components/profile/update_experience/UpdateExperience";
import Game from "./components/game/game/Game";
import Focus from "./components/game/clue/focus/Focus";
import PrivateRoute from "./components/routing/PrivateRoute";
import ActiveStats from "./components/stats/active_stats/ActiveStats";
import PlayerStats from "./components/stats/player_stats/PlayerStats";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Account from "./components/account/Account";
import Players from "./components/players/Players";
import ViewProfile from "./components/profile/view_profile/ViewProfile";

// REDUX
import { Provider } from "react-redux";
import store from "./store";

// Auth Helper
import set_auth_token from "./utils/set_auth_token";

// ACTIONS
import { load_user } from "./actions/auth";

// alert cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE
};

const AlertTemplate = props => {
 

  // width: auto;
  // clear: both;
  // margin-top: 10px;
  // position: relative;
  // max-width:100%;
  // height: auto;
  // min-height: $toast-height;
  // line-height: 1.5em;
  // word-break: keep-all;
  // background-color: $toast-color;
  // padding: 10px 25px;
  // font-size: 1.1rem;
  // font-weight: 300;
  // color: $toast-text-color;

  return (
    <div
      className="card custom-alert"
    >
      {/* {props.options.type === "info" && "!"}
      {props.options.type === "success" && ":)"}
      {props.options.type === "error" && ":("} */}
      {props.message}
      <button onClick={props.close}>X</button>
    </div>
  );
};

export class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.token) {
      set_auth_token(localStorage.token);
    }
    store.dispatch(load_user());
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          <AlertProvider template={AlertTemplate} {...options}>
            <Router>
              <div className="App">
                <Navbar />
                <Alert />
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/profile"
                    component={ActiveProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/update-profile"
                    component={UpdateProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/create-experience"
                    component={CreateExperience}
                  />
                  <PrivateRoute
                    exact
                    path="/update-experience/:exp_id"
                    component={UpdateExperience}
                  />
                  <PrivateRoute exact path="/game" component={Game} />
                  <PrivateRoute exact path="/clue" component={Focus} />
                  <PrivateRoute exact path="/stats" component={ActiveStats} />
                  <PrivateRoute
                    exact
                    path="/leaderboard"
                    component={Leaderboard}
                  />
                  <PrivateRoute exact path="/account" component={Account} />
                  <PrivateRoute exact path="/players" component={Players} />
                  <PrivateRoute
                    exact
                    path="/profile/:profile_id"
                    component={ViewProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/leaderboard/profile/:user_id"
                    component={ViewProfile}
                  />
                  <PrivateRoute
                    exact
                    path="/profile/:profile_id/stats/:user_id"
                    component={PlayerStats}
                  />
                </Switch>
              </div>
            </Router>
          </AlertProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
