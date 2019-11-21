import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// ACTIONS
import { register } from "../../../actions/auth";

export class Register extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: ""
  };

  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-gradient");
    if (this.props.auth.is_authenticated) {
      this.props.history.push("/dashboard");
    }
  }

  on_change = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  on_submit = e => {
    e.preventDefault();

    const new_user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.register(new_user, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="col m12 card">
            <div className="row mt-row">
              <div className="login-heading jeopardy-blue-dark-text center-align bold-text heading-font">
                Register
              </div>
            </div>
            <div className="row">
              <div className="col m12 center-align">
                <p className="grey-text text-darken-1">
                  Already have an account?&nbsp;
                  <Link
                    to="/login"
                    className="jeopardy-blue-dark-text bold-text landing-link"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
            <form onSubmit={this.on_submit}>
              <div className="row">
                <div className="custom-input-field">
                  <div className="input-field col m6 offset-m3">
                    <input
                      id="first_name"
                      type="text"
                      name="first_name"
                      value={this.state.first_name}
                      onChange={this.on_change}
                    />
                    <label className="active" htmlFor="first_name">
                      First Name
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="custom-input-field">
                  <div className="input-field col m6 offset-m3">
                    <input
                      id="last_name"
                      type="text"
                      name="last_name"
                      value={this.state.last_name}
                      onChange={this.on_change}
                    />
                    <label className="active" htmlFor="last_name">
                      Last Name
                    </label>
                  </div>
                </div>
              </div>
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
              <div className="row">
                <div className="custom-input-field">
                  <div className="input-field col m6 offset-m3">
                    <input
                      id="password2"
                      type="password"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.on_change}
                    />
                    <label className="active" htmlFor="password2">
                      Confirm Password
                    </label>
                  </div>
                </div>
              </div>
              <div className="row submit-row">
                <div className="col m6 offset-m3">
                  <button
                    type="submit"
                    className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-text"
                  >
                    Register
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { register }
)(withRouter(Register));
