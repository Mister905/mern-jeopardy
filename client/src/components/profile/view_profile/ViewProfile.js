import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import M from "materialize-css";
import Loader from "../../layout/loader/Loader";
import Moment from "react-moment";
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
    this.props.clear_player_profile();
  }

  componentDidMount = () => {
    if (this.props.match.params.profile_id) {
      const { profile_id } = this.props.match.params;
      if (profile_id) {
        this.props.get_profile_by_profile_id(profile_id);
        this.props.get_player_experience(profile_id);
      }
    }
    if (this.props.match.params.user_id) {
      const { user_id } = this.props.match.params;
      if (user_id) {
        this.props.get_profile_by_user_id(user_id);
      }
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.profile.player_profile) {
      let user_id = this.props.profile.player_profile.user;
      this.props.get_player_name(user_id);
    }

    if (this.bio_text_area.current) {
      M.textareaAutoResize(this.bio_text_area.current);
    }
  };

  render() {
    let { loading_profile, loading_player_name } = this.props.profile;
    if (loading_profile || loading_player_name) {
      return (
        <div className="container">
          <Loader />
        </div>
      );
    } else {
      const {
        biography,
        specialties,
        experience
      } = this.props.profile.player_profile;
      const { player_name } = this.props.profile;
      const { profile_id } = this.props.match.params;
      const user_id = this.props.profile.player_profile.user;
      return (
        <div className="container">
          <div className="row mt-row">
            <div className="card view-profile-card">
              <div className="row heading-row">
                <div className="col m2 center-align">
                  <Link
                    to="/players"
                    className="btn btn-small hoverable bold-text btn-custom"
                  >
                    <i className="material-icons left  bold-text">
                      keyboard_backspace
                    </i>
                    Back
                  </Link>
                </div>
                <div className="col m4 offset-m2 center-align jeopardy-blue-dark-text bold-text">
                  <div className="heading-font">{player_name}</div>
                </div>
                <div className="col m2 offset-m2 center-align">
                  <Link
                    to={`/profile/${profile_id}/stats/${user_id}`}
                    className="btn btn-small hoverable bold-text btn-custom"
                  >
                    <i className="material-icons left  bold-text">
                      star_border
                    </i>
                    Stats
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col m10 offset-m1">
                  <form
                    noValidate
                    onSubmit={this.on_submit}
                    className="view-profile-form"
                  >
                    <div className="row">
                      <div className="col m12 input-col">
                        <label
                          className="jeopardy-blue-dark-text bold-text"
                          htmlFor="biography"
                        >
                          Biography
                        </label>
                        <textarea
                          disabled
                          id="biography"
                          className="materialize-textarea jeopardy-black-text"
                          value={biography}
                          ref={this.bio_text_area}
                        ></textarea>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col m12 input-col">
                        <label
                          className="jeopardy-blue-dark-text bold-text"
                          htmlFor="specialties"
                        >
                          Specialties
                        </label>
                        {specialties.length > 0 ? (
                          <input
                            className="jeopardy-black-text"
                            disabled
                            type="text"
                            name="specialties"
                            value={specialties.join(", ")}
                          />
                        ) : (
                          <input
                            disabled
                            type="text"
                            name="specialties"
                            value={specialties}
                          />
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col m12 input-col">
                        {experience.length > 0 ? (
                          <div>
                            <label
                              className="jeopardy-blue-dark-text bold-text"
                              htmlFor="biography"
                            >
                              Experience
                            </label>
                            <ul className="collection">
                              {experience.map((item, index) => {
                                return (
                                  <li className="collection-item" key={index}>
                                    <div className="bold-text view-company-output">
                                      {item.company}
                                    </div>
                                    <div className="title-output">
                                      {item.title}
                                    </div>
                                    <div className="location-output">
                                      {item.location}
                                    </div>
                                    <div className="description-output">
                                      {item.description}
                                    </div>
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
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ) : (
                          <div>
                            <div className="jeopardy-blue-dark-text no-experience">
                              You haven't defined any experience yet
                            </div>
                            <Link
                              className="btn jeopardy-blue-dark hoverable bold-text"
                              to="/create-experience"
                            >
                              <i className="material-icons left ">add</i>
                              <span className="new-experience">Add</span>
                            </Link>
                          </div>
                        )}
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
