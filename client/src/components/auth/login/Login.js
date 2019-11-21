import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../../actions/auth";
import Loader from "../../layout/loader/Loader";

export class Login extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-gradient");
  }

  state = {
    email: "",
    password: "",
    loading: false
  };

  componentDidUpdate = () => {
    if (this.props.auth.is_authenticated) {
      this.props.history.push("/dashboard");
    }
  };

  on_change = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  on_submit = e => {
    e.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState({
      loading: true
    });
    this.props.login(credentials, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="col m12 card">
            <div className="row mt-row">
              <div className="col m12">
                <div className="heading-font jeopardy-blue-dark-text center-align bold-text">
                  Login
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m12 center-align">
                <p className="grey-text text-darken-1">
                  Don't have an account yet?&nbsp;
                  <Link
                    to="/register"
                    className="jeopardy-blue-dark-text bold-text landing-link"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
            <form onSubmit={this.on_submit}>
              <div className="row">
                <div className="custom-input-field">
                  <div className="input-field col m6 offset-m3">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.on_change}
                    />
                    <label className="active" htmlFor="email">
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="custom-input-field">
                  <div className="input-field col m6 offset-m3">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.on_change}
                    />
                    <label className="active" htmlFor="password">
                      Password
                    </label>
                  </div>
                </div>
              </div>
              <div className="row submit-row">
                <div className="col m6 offset-m3">
                  <button
                    type="submit"
                    className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-text"
                    onClick={this.on_submit}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  is_authenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { login }
)(withRouter(Login));
