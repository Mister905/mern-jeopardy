import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import not_found_image from "../../../assets/img/mern_pooh.jpg";

class NotFound extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-gradient");
  }

  render() {
    const { is_authenticated } = this.props.auth;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="col m12 center-align jeopardy-blue-dark-text">
            <h1>Page Not Found</h1>
            <h2>Oh bother...</h2>
          </div>
        </div>
        <div className="row">
          <div className="col m6 offset-m3">
            <img
              src={not_found_image}
              className="responsive-img"
              alt="404 Error - Page Not Found"
            />
          </div>
        </div>
        <div className="row">
          <div className="col m2 offset-m5 center-align">
            {is_authenticated ? (
              <Link
                to="/dashboard"
                className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-wide"
              >
                <i className="material-icons custom-icon">home</i>Dashboard
              </Link>
            ) : (
              <Link
                to="/"
                className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-wide"
              >
                <i className="material-icons custom-icon">home</i>Back
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(NotFound);
