import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css";
import Loader from "../../layout/loader/Loader";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import logo from "../../../assets/img/jeopardy_logo_profile.png";
import {
  get_profile_by_profile_id,
  get_profile_by_user_id,
  get_player_name,
  clear_player_profile
} from "../../../actions/profile";
import { get_player_experience } from "../../../actions/experience";

class ViewProfile extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-gradient");
  }

  componentDidMount = () => {
    const { profile_id } = this.props.match.params;
    this.props.get_profile_by_profile_id(profile_id);
    this.props.get_player_experience(profile_id);
  };

  componentDidUpdate = prevProps => {
    if (
      this.props.profile.player_profile !== prevProps.profile.player_profile
    ) {
      let user_id = this.props.profile.player_profile.user;
      this.props.get_player_name(user_id);
    }
  };

  componentWillUnmount = () => {
    this.props.clear_player_profile();
  };

  render() {
    let { loading_profile, loading_player_name } = this.props.profile;
    let { loading_experience } = this.props.experience;
    if (loading_profile || loading_player_name || loading_experience) {
      return (
        <div className="container">
          <Loader />
        </div>
      );
    } else {
      const {
        biography,
        specialties,
        experience,
        profile_image_id,
        linkedin,
        twitter,
        facebook
      } = this.props.profile.player_profile;
      const { player_name } = this.props.profile;
      const { profile_id } = this.props.match.params;
      const user_id = this.props.profile.player_profile.user;
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
                              src={`http://localhost:5000/api/profile/profile-image/${profile_image_id}`}
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
                            <div className="jeopardy-blue-dark-text bold-text heading-font flow-text">{`${player_name}`}</div>
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
                              <i className="material-icons left  bold-text">
                                home
                              </i>
                              Home
                            </Link>
                          </div>
                          <div className="col m6 left-align">
                            <Link
                              to={`/profile/${profile_id}/stats/${user_id}`}
                              className="btn waves-effect waves-jeopardy-blue bold-text btn-custom"
                            >
                              <i className="material-icons left  bold-text">
                                star_border
                              </i>
                              Stats
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
                        </div>
                      ) : (
                        <div>
                          <div className="jeopardy-blue-dark-text bold-text empty-experience">
                            This player hasn't defined any experience yet
                          </div>
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

const mapStateToProps = state => ({
  profile: state.profile,
  experience: state.experience
});

export default connect(mapStateToProps, {
  get_profile_by_profile_id,
  get_profile_by_user_id,
  get_player_experience,
  get_player_name,
  clear_player_profile
})(withRouter(ViewProfile));
