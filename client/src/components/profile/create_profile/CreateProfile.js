import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { create_profile } from "../../../actions/profile";
import M from "materialize-css";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    document.body.classList.remove("jeopardy-gradient");
    document.body.classList.add("jeopardy-grey");
    this.bio_textarea = React.createRef();
  }

  state = {
    biography: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    specialties: "",
    profile_image: null,
    loaded: 0
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.biography !== this.state.biography) {
      M.textareaAutoResize(this.bio_textarea.current);
    }
  };

  on_change = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  on_image_change = e => {
    this.setState({
      profile_image: e.target.files[0]
    });
  };

  on_submit = e => {
    e.preventDefault();
    const form_data = {
      biography: this.state.biography,
      linkedin: this.state.linkedin,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      specialties: this.state.specialties,
      profile_image: this.state.profile_image
    };

    this.props.create_profile(form_data, this.props.history);
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12">
            <div className="row mt-row">
              <div className="col m2 center-align">
                <Link
                  to="/dashboard"
                  className="btn btn-custom btn-text btn-back waves-effect waves-jeopardy-blue"
                >
                  <i className="material-icons  bold-text">
                    arrow_back
                  </i>
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <div className="heading-font bold-text jeopardy-blue-dark-text">
                  Create Profile
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m10 offset-m1">
                <form
                  className="mt-form"
                  noValidate
                  onSubmit={this.on_submit}
                  encType="multipart/form-data"
                >
                  <div className="row">
                    <div className="custom-input-field">
                      <div className="file-field input-field col m10 offset-m1">
                        <div className="btn waves-effect waves-jeopardy-blue btn-custom">
                          <span>
                            <i className="material-icons">add_a_photo</i>
                          </span>
                          <input
                            type="file"
                            name="profile-image"
                            onChange={this.on_image_change}
                          />
                        </div>
                        <div className="file-path-wrapper">
                          <input
                            className="file-path"
                            type="text"
                            placeholder="Upload profile picture"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="custom-input-field">
                      <div className="input-field col m10 offset-m1">
                        <textarea
                          id="biography"
                          className="materialize-textarea"
                          value={this.state.biography}
                          onChange={this.on_change}
                          ref={this.bio_textarea}
                        ></textarea>
                        <label className="active" htmlFor="password">
                          Biography
                        </label>
                        <span className="helper-text italic">Required</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="custom-input-field">
                      <div className="input-field col m10 offset-m1">
                        <input
                          id="linkedin"
                          type="text"
                          name="linkedin"
                          value={this.state.linkedin}
                          onChange={this.on_change}
                        />
                        <label className="active" htmlFor="linkedin">
                          LinkedIn
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="custom-input-field">
                      <div className="input-field col m10 offset-m1">
                        <input
                          id="twitter"
                          type="text"
                          name="twitter"
                          value={this.state.twitter}
                          onChange={this.on_change}
                        />
                        <label className="active" htmlFor="twitter">
                          Twitter
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="custom-input-field">
                      <div className="input-field col m10 offset-m1">
                        <input
                          id="facebook"
                          type="text"
                          name="facebook"
                          value={this.state.facebook}
                          onChange={this.on_change}
                        />
                        <label className="active" htmlFor="facebook">
                          Facebook
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="custom-input-field">
                      <div className="input-field col m10 offset-m1">
                        <input
                          id="specialties"
                          type="text"
                          name="specialties"
                          value={this.state.specialties}
                          onChange={this.on_change}
                        />
                        <label className="active" htmlFor="specialties">
                          Specialties
                        </label>
                        <span className="helper-text italic">
                          Please use comma-separated values
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col m10 offset-m1">
                      <button
                        type="submit"
                        className="btn btn-large waves-effect waves-jeopardy-blue bold-text btn-wide btn-custom btn-text"
                      >
                        Create Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  create_profile: PropTypes.func.isRequired
};

export default connect(
  null,
  { create_profile }
)(withRouter(CreateProfile));
