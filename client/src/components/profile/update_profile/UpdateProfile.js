import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css";
import { get_active_profile, update_profile } from "../../../actions/profile";
import {
  delete_experience,
  get_active_experience
} from "../../../actions/experience";
import Loader from "../../layout/loader/Loader";
import Moment from "react-moment";
import { Modal, Button, Textarea } from "react-materialize";
import modal_logo from "../../../assets/img/nav_jeopardy_logo.png";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-gradient");
    this.bio_textarea = React.createRef();
    this.props.get_active_profile();
    this.props.get_active_experience();
  }

  state = {
    biography: "",
    specialties: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    experience: []
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.biography !== this.state.bio_textarea) {
      if (this.bio_textarea.current) {
        try {
          M.textareaAutoResize(this.bio_textarea.current);
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (
      prevProps.experience.active_experience !=
      this.props.experience.active_experience
    ) {
      const { active_experience } = this.props.experience;
      this.setState({
        experience: active_experience,
        experience_loading: false
      });
    }

    if (prevProps.profile.active_profile != this.props.profile.active_profile) {
      const { active_profile } = this.props.profile;
      const {
        biography,
        specialties,
        linkedin,
        twitter,
        facebook
      } = active_profile;
      console.log(specialties)
      console.log(typeof(specialties))
      this.setState({
        biography,
        linkedin,
        twitter,
        facebook,
        specialties: specialties.toString().replace(/,/g, ', '),
        profile_loading: false
      });
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
      specialties: this.state.specialties,
      linkedin: this.state.linkedin,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      profile_image: this.state.profile_image
    };
    this.props.update_profile(form_data, this.props.history);
  };

  handle_delete = e => {
    const experience_id = e.target.value;
    this.props.delete_experience(experience_id);
  };

  output_active_profile = () => {
    const { active_profile } = this.props.profile;
    const { experience } = this.state;
    const { profile_image_id } = this.props.profile.active_profile;
    const { specialties } = this.props.profile.active_profile;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12">
            <div className="row mt-row">
              <div className="col m2 center-align">
                <Link
                  to="/profile"
                  className="btn btn-custom btn-text btn-back waves-effect waves-jeopardy-blue"
                >
                  <i className="material-icons  bold-text">arrow_back</i>
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <div className="heading-font bold-text jeopardy-blue-dark-text">
                  Update Profile
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
                    <div className="col m4 offset-m4">
                      <label>Current Profile Image</label>
                      <img
                        className="responsive-img"
                        src={`/api/profile/profile-image/${profile_image_id}`}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="custom-input-field">
                      <div className="file-field input-field col m8 offset-m2">
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
                            placeholder="Update profile picture"
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
                        Update Profile
                      </button>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col m10 offset-m1">
                    <label
                      className="jeopardy-blue-dark-text bold-text"
                      htmlFor="biography"
                    >
                      Experience
                    </label>
                    {experience.length > 0 ? (
                      <div>
                        {experience.map((item, index) => {
                          return (
                            <div
                              className="card experience-card"
                              key={item._id}
                            >
                              <div className="row experience-field">
                                <div className="col m6">
                                  <div className="bold-text">
                                    {item.company}
                                  </div>
                                </div>
                                <div className="col m6">
                                  <Link
                                    className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-text btn-update-exp right"
                                    to={`/update-experience/${item._id}`}
                                  >
                                    <i className="material-icons edit-icon">
                                      edit
                                    </i>
                                  </Link>
                                  <Modal
                                    className="center-align delete-record-modal"
                                    trigger={
                                      <Button className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-text right">
                                        <i className="material-icons delete-icon">
                                          delete
                                        </i>
                                      </Button>
                                    }
                                    actions={
                                      <div>
                                        <Button
                                          className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-cancel"
                                          modal="close"
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-delete"
                                          modal="close"
                                          value={item._id}
                                          onClick={this.handle_delete}
                                        >
                                          Delete
                                        </Button>
                                      </div>
                                    }
                                  >
                                    <img src={modal_logo} alt="" />
                                    <div className="bold-text delete-modal-heading jeopardy-blue-dark-text">
                                      Delete Expierence
                                    </div>
                                    <p className="warning-text">
                                      Are you sure you want to delete this
                                      experience record?
                                    </p>
                                  </Modal>
                                </div>
                              </div>
                              <div className="row experience-field">
                                <div className="col m12">
                                  <div className="">{item.title}</div>
                                </div>
                              </div>
                              <div className="row experience-field">
                                <div className="col m12">
                                  <div className="">{item.location}</div>
                                </div>
                              </div>
                              <div className="row experience-field">
                                <div className="col m12">
                                  <div className="">{item.description}</div>
                                </div>
                              </div>
                              <div className="row experience-field">
                                <div className="col m12">
                                  <div className="date-outputs right-align">
                                    <span className="from-date-output bold-text">
                                      {
                                        <Moment format="MMMM D, YYYY">
                                          {item.from_date}
                                        </Moment>
                                      }
                                    </span>
                                    -
                                    <span className="to-date-output bold-text">
                                      {item.is_current ? (
                                        "Present"
                                      ) : (
                                        <Moment format="MMMM DD, YYYY">
                                          {item.to_date}
                                        </Moment>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <Link
                          className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-create-experience "
                          to="/create-experience"
                        >
                          <i className="material-icons left bold-text">add</i>
                          <span className="new-experience">Create</span>
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <div className="jeopardy-blue-dark-text bold-text">
                          You haven't defined any experience yet
                        </div>
                        <Link
                          className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-create-experience"
                          to="/create-experience"
                        >
                          <i className="material-icons left bold-text">add</i>
                          <span className="new-experience">Create</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    let { loading_active_profile } = this.props.profile;
    let { loading_active_experience } = this.props.experience;
    if (loading_active_profile || loading_active_experience) {
      return (
        <div className="container">
          <Loader />;
        </div>
      );
    } else {
      return this.output_active_profile();
    }
  }
}

UpdateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  update_profile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  experience: state.experience
});

export default connect(mapStateToProps, {
  get_active_profile,
  update_profile,
  get_active_experience,
  delete_experience
})(withRouter(UpdateProfile));
