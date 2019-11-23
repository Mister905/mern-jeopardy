import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get_profile } from "../../../actions/profile";
import { get_active_experience } from "../../../actions/experience";
import Loader from "../../layout/loader/Loader";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import logo from "../../../assets/img/jeopardy_logo_profile.png";

class ActiveProfile extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-gradient");
  }

  componentDidMount = () => {
    this.props.get_profile();
    this.props.get_active_experience();
  };

  render() {
    let { loading_profile } = this.props.profile;
    if (loading_profile) {
      return (
        <div className="row">
          <div className="col m2 offset-m5 center-align">
            <Loader />
          </div>
        </div>
      );
    } else {
      let {
        biography,
        specialties,
        experience,
        profile_image_id,
        linkedin,
        twitter,
        facebook
      } = this.props.profile.active_profile;
      const { first_name } = this.props.auth.user;
      const { last_name } = this.props.auth.user;
      return (
        <div className="container">
          <div className="row mt-row">
            <div className="col m12 gradient-row">
              <div className="row">
                <div className="col m12">
                  <div className="card profile-media-card jeopardy-grey">
                    <div className="row">
                      <div className="col m4">
                        <div className="card profile-image-card">
                          <div className="card-image">
                            <img
                              className="responsive-img"
                              src={`/api/profile/profile-image/${profile_image_id}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col m8 center-align logo-col">
                        <div className="row profile-logo-row">
                          <div className="col m12">
                            <img
                              src={logo}
                              className="responsive-img profile-logo"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col m12 center-align">
                            <div className="jeopardy-blue-dark-text bold-text heading-font flow-text">{`${first_name} ${last_name}`}</div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col m12">
                            <a href={facebook} target="_blank">
                              <FontAwesomeIcon
                                icon={faFacebook}
                                className="social-media-icon jeopardy-blue-dark-text"
                              />
                            </a>
                            <a href={twitter} target="_blank">
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className="social-media-icon jeopardy-blue-dark-text"
                              />
                            </a>
                            <a href={linkedin} target="_blank">
                              <FontAwesomeIcon
                                icon={faLinkedin}
                                className="social-media-icon jeopardy-blue-dark-text"
                              />
                            </a>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col m6 right-align">
                            <Link
                              to="/dashboard"
                              className="btn waves-effect waves-jeopardy-blue bold-text btn-custom"
                            >
                              <i className="material-icons custom-icon bold-text">
                                home
                              </i>
                              Home
                            </Link>
                          </div>
                          <div className="col m6 left-align">
                            <Link
                              to="/update-profile"
                              className="btn waves-effect waves-jeopardy-blue bold-text btn-custom"
                            >
                              <i className="material-icons custom-icon bold-text">
                                edit
                              </i>
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m12">
                  <div className="card jeopardy-grey">
                    <div className="card-content jeopardy-blue-dark-text">
                      <span className="card-title bold-text">Specialties</span>
                      <div className="specialties profile-output">
                        {specialties.length > 0
                          ? specialties.join(", ")
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m12">
                  <div className="card jeopardy-grey">
                    <div className="card-content jeopardy-blue-dark-text">
                      <span className="card-title bold-text">Biography</span>
                      <div className="biography profile-output">
                        {biography}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col m12">
                  <div className="card jeopardy-grey">
                    <div className="card-content">
                      <span className="card-title experience-title bold-text jeopardy-blue-dark-text">
                        Experience
                      </span>
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
                            <i className="material-icons custom-icon bold-text">add</i>
                            Create
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <div className="jeopardy-blue-dark-text bold-text empty-experience">
                            You haven't defined any experience yet
                          </div>
                          <Link
                            className="btn waves-effect waves-jeopardy-blue bold-text btn-custom btn-create-experience "
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
    }
  }
}

ActiveProfile.propTypes = {
  get_profile: PropTypes.func.isRequired,
  get_active_experience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  experience: state.experience
});

export default connect(
  mapStateToProps,
  { get_profile, get_active_experience }
)(ActiveProfile);
