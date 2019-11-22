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
    this.props.clear_player_profile();
  }

  componentDidMount = () => {
    const { profile_id } = this.props.match.params;
    this.props.get_profile_by_profile_id(profile_id);
    this.props.get_player_experience(profile_id);

    // if (this.props.match.params.profile_id) {
    //   const { profile_id } = this.props.match.params;
    //   if (profile_id) {
    //     this.props.get_profile_by_profile_id(profile_id);
    //     this.props.get_player_experience(profile_id);
    //   }
    // }
    // if (this.props.match.params.user_id) {
    //   const { user_id } = this.props.match.params;
    //   if (user_id) {
    //     this.props.get_profile_by_user_id(user_id);
    //   }
    // }
  };

  componentDidUpdate = prevProps => {
    if (
      this.props.profile.player_profile !== prevProps.profile.player_profile
    ) {
      let user_id = this.props.profile.player_profile.user;
      this.props.get_player_name(user_id);
    }
  };

  render() {
    let { loading_profile, loading_player_name } = this.props.profile;
    let { loading_experience } = this.props.experience;
    if (loading_profile || loading_player_name || loading_player_name) {
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
                              to="/update-profile"
                              className="btn waves-effect waves-jeopardy-blue bold-text btn-custom"
                            >
                              <i className="material-icons left  bold-text">
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
                            <i className="material-icons left bold-text">add</i>
                            <span className="new-experience">Create</span>
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
        // <div className="container">
        //   <div className="row mt-row">
        //     <div className="card view-profile-card">
        //       <div className="row heading-row">
        //         <div className="col m2 center-align">
        //           <Link
        //             to="/players"
        //             className="btn btn-small hoverable bold-text btn-custom"
        //           >
        //             <i className="material-icons left  bold-text">
        //               keyboard_backspace
        //             </i>
        //             Back
        //           </Link>
        //         </div>
        //         <div className="col m4 offset-m2 center-align jeopardy-blue-dark-text bold-text">
        //           <div className="heading-font">{player_name}</div>
        //         </div>
        //         <div className="col m2 offset-m2 center-align">
        //           <Link
        //             to={`/profile/${profile_id}/stats/${user_id}`}
        //             className="btn btn-small hoverable bold-text btn-custom"
        //           >
        //             <i className="material-icons left  bold-text">
        //               star_border
        //             </i>
        //             Stats
        //           </Link>
        //         </div>
        //       </div>
        //       <div className="row">
        //         <div className="col m10 offset-m1">
        //           <form
        //             noValidate
        //             onSubmit={this.on_submit}
        //             className="view-profile-form"
        //           >
        //             <div className="row">
        //               <div className="col m12 input-col">
        //                 <label
        //                   className="jeopardy-blue-dark-text bold-text"
        //                   htmlFor="biography"
        //                 >
        //                   Biography
        //                 </label>
        //                 <textarea
        //                   disabled
        //                   id="biography"
        //                   className="materialize-textarea jeopardy-black-text"
        //                   value={biography}
        //                   ref={this.bio_text_area}
        //                 ></textarea>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col m12 input-col">
        //                 <label
        //                   className="jeopardy-blue-dark-text bold-text"
        //                   htmlFor="specialties"
        //                 >
        //                   Specialties
        //                 </label>
        //                 {specialties.length > 0 ? (
        //                   <input
        //                     className="jeopardy-black-text"
        //                     disabled
        //                     type="text"
        //                     name="specialties"
        //                     value={specialties.join(", ")}
        //                   />
        //                 ) : (
        //                   <input
        //                     disabled
        //                     type="text"
        //                     name="specialties"
        //                     value={specialties}
        //                   />
        //                 )}
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col m12 input-col">
        //                 {experience.length > 0 ? (
        //                   <div>
        //                     <label
        //                       className="jeopardy-blue-dark-text bold-text"
        //                       htmlFor="biography"
        //                     >
        //                       Experience
        //                     </label>
        //                     <ul className="collection">
        //                       {experience.map((item, index) => {
        //                         return (
        //                           <li className="collection-item" key={index}>
        //                             <div className="bold-text view-company-output">
        //                               {item.company}
        //                             </div>
        //                             <div className="title-output">
        //                               {item.title}
        //                             </div>
        //                             <div className="location-output">
        //                               {item.location}
        //                             </div>
        //                             <div className="description-output">
        //                               {item.description}
        //                             </div>
        //                             <div className="date-outputs right-align">
        //                               <span className="from-date-output bold-text">
        //                                 {
        //                                   <Moment format="MMMM D, YYYY">
        //                                     {item.from_date}
        //                                   </Moment>
        //                                 }
        //                               </span>
        //                               -
        //                               <span className="to-date-output bold-text">
        //                                 {item.is_current ? (
        //                                   "Present"
        //                                 ) : (
        //                                   <Moment format="MMMM DD, YYYY">
        //                                     {item.to_date}
        //                                   </Moment>
        //                                 )}
        //                               </span>
        //                             </div>
        //                           </li>
        //                         );
        //                       })}
        //                     </ul>
        //                   </div>
        //                 ) : (
        //                   <div>
        //                     <div className="jeopardy-blue-dark-text no-experience">
        //                       You haven't defined any experience yet
        //                     </div>
        //                     <Link
        //                       className="btn jeopardy-blue-dark hoverable bold-text"
        //                       to="/create-experience"
        //                     >
        //                       <i className="material-icons left ">add</i>
        //                       <span className="new-experience">Add</span>
        //                     </Link>
        //                   </div>
        //                 )}
        //               </div>
        //             </div>
        //           </form>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      );
    }
  }

  // if (loading_profile || loading_player_name) {
  //   return (
  //     <div className="container">
  //       <Loader />
  //     </div>
  //   );
  // } else {
  //   return (
  //     'derp'
  //   )
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
