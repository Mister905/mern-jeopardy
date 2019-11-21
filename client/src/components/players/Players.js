import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get_profiles } from "../../actions/profile";
import { clear_player_profile } from "../../actions/profile";
import Loader from "../layout/loader/Loader";
import logo from "../../assets/img/jeopardy_logo_player_list.png";

class Players extends Component {
  constructor(props) {
    super(props);
    document.body.classList.add("jeopardy-gradient");
  }

  componentDidMount = () => {
    this.props.get_profiles();
  };

  render_output = () => {
    let active_profile_id = this.props.profile.active_profile._id;
    const { profiles } = this.props.profile;
    console.log(profiles);
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12 jeopardy-grey">
            <div className="row mt-row">
              <div className="col m2 center-align">
                <Link
                  to="/dashboard"
                  className="btn btn-custom btn-text btn-back waves-effect waves-jeopardy-blue"
                >
                  <i className="material-icons  bold-text">arrow_back</i>
                </Link>
              </div>
              <div className="col m4 offset-m2 center-align">
                <img src={logo} className="responsive-img profile-logo" />
              </div>
            </div>
            <div className="row mt-25">
              <div className="col m4 offset-m4 center-align">
                <div className="jeopardy-blue-dark-text leaderboard-heading bold-text">
                  Players
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m4 offset-m4">
                <ul class="collection players-collection center-align">
                  {profiles.map((item, index) => {
                    if (item.profile_id !== active_profile_id) {
                      return (
                        <Link
                          to={`profile/${item.profile_id}`}
                          key={index}
                          className="collection-item players-ci jeopardy-blue-dark-text players-ci-font"
                        >
                          {item.name}
                        </Link>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // render_list = () => {
  //   if (this.props.profile.active_profile) {
  //     let active_profile_id = this.props.profile.active_profile._id;
  //     const { profiles } = this.props.profile;
  //     let output = profiles.map((item, index) => {
  //       if (item._id !== active_profile_id) {
  //         return (
  //           <Link
  //             to={`profile/${item._id}`}
  //             key={index}
  //             className="collection-item jeopardy-blue-dark-text"
  //           >
  //             <div className="row profile-link-row">
  //               <div className="col m1 offset-m1 center-align">
  //                 <i className="material-icons ">account_circle</i>
  //               </div>
  //               <div className="col m8 center-align">
  //                 <span className="profile-link-username bold-text jeopardy-blue-dark-text">
  //                   {item.user.name}
  //                 </span>
  //               </div>
  //             </div>
  //           </Link>
  //         );
  //       }
  //     });
  //     return output;
  //   } else {
  //     return null;
  //   }
  // };

  // render_profiles = () => {
  //   return (
  //     <div>
  //       <div className="container">
  //         <div className="row mt-row">
  //           <div className="card players-card col m12">
  //             <div className="row mt-row">
  //               <div className="col m2">
  //                 <Link
  //                   to="/dashboard"
  //                   className="btn jeopardy-blue-dark hoverable bold-text players-home-btn"
  //                 >
  //                   <i className="material-icons left  bold-text">
  //                     keyboard_backspace
  //                   </i>
  //                   Back
  //                 </Link>
  //               </div>
  //               <div className="col m4 offset-m2 heading-col heading-cold">
  //                 <div className="profiles-heading jeopardy-blue-dark-text center-align bold-text">
  //                   Players
  //                 </div>
  //               </div>
  //             </div>
  //             <div className="row">
  //               <div className="col m8 offset-m2 background-col">
  //                 <div className="row">
  //                   <div className="col m8 offset-m2">
  //                     <div className="card profiles-card">
  //                       <div className="collection players-collection">
  //                         {this.render_list()}
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  render() {
    const { loading_profiles } = this.props.profile;
    if (loading_profiles) {
      return (
        <div className="container">
          <Loader />;
        </div>
      );
    } else {
      return this.render_output();
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { get_profiles, clear_player_profile })(
  withRouter(Players)
);
