import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../../../assets/img/logo-secondary.png";

export class Landing extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-gradient");
  }

  componentDidMount = () => {
    if (this.props.is_authenticated) {
      this.props.history.push("/dashboard");
    }
  };

  componentDidUpdate = () => {
    if (this.props.is_authenticated) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row landing-row">
          <div className="col m12">
            <div className="card landing-outer-card jeopardy-grey">
              <div className="row">
                <div className="col m4 offset-m4">
                  <img
                    className="responsive-img landing-logo"
                    src={logo}
                    alt="Jeopardy Logo"
                  />
                </div>
              </div>
              <div className="row mt-row">
                <div className="col m5 offset-m1">
                  <div className="card landing-register-card">
                    <div className="card-content jeopardy-blue-dark-text">
                      <span className="card-title bold-text center-align">
                        Register
                      </span>
                      <p className="center-align">Create a new account</p>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                      <div className="col m10 offset-m1">
                        <Link
                          className="btn btn-large btn-custom waves-effect waves-jeopardy-blue btn-text bold-text btn-landing"
                          to="/register"
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col m5">
                  <div className="card landing-login-card">
                    <div className="card-content jeopardy-blue-dark-text">
                      <span className="card-title bold-text center-align">
                        Login
                      </span>
                      <p className="center-align">Login to your account</p>
                    </div>
                    <div className="divider"></div>
                    <div className="row">
                      <div className="col m10 offset-m1">
                        <Link
                          className="btn btn-large btn-custom waves-effect waves-jeopardy-blue btn-text bold-text btn-landing"
                          to="/login"
                        >
                          Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  is_authenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  is_authenticated: state.auth.is_authenticated
});

export default connect(mapStateToProps)(Landing);
