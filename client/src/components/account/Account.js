import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { delete_profile, delete_account } from "../../actions/settings";
import { Modal, Button } from "react-materialize";
import logo from "../../assets/img/jeopardy_logo_profile.png";
import modal_logo from "../../assets/img/nav_jeopardy_logo.png";

class Account extends Component {
  handle_delete_profile = () => {
    this.props.delete_profile(this.props.history);
  };

  handle_delete_account = () => {
    this.props.delete_account(this.props.history);
  };
  render() {
    const { active_profile } = this.props.profile;
    const user_id = this.props.auth.user._id;
    return (
      <div className="container">
        <div className="row mt-row">
          <div className="card col m12 jeopardy-grey">
            <div className="row mt-25">
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
            <div className="row">
              <div className="col m4 offset-m4 center-align">
                <div className="jeopardy-blue-dark-text leaderboard-heading bold-text">
                  Account
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m4 offset-m4">
                <Modal
                  className="center-align delete-record-modal"
                  trigger={
                    <Button className="btn btn-large btn-wide btn-custom waves-effect waves-jeopardy-blue bold-text btn-delete-profile">
                      <i class="material-icons delete-account-icon">
                        delete_forever
                      </i>
                      Delete Profile
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
                        onClick={this.handle_delete_profile}
                      >
                        Delete
                      </Button>
                    </div>
                  }
                >
                  <img src={modal_logo} alt="" />
                  <div className="bold-text delete-modal-heading jeopardy-blue-dark-text">
                    Delete Profile
                  </div>
                  <p className="warning-text">
                    Are you sure you want to delete your profile?
                  </p>
                </Modal>
              </div>
            </div>
            <div className="row">
              <div className="col m4 offset-m4">
                <Modal
                  className="center-align delete-record-modal"
                  trigger={
                    <Button className="btn btn-large btn-wide btn-custom waves-effect waves-jeopardy-blue bold-text btn-delete-profile">
                      <i class="material-icons delete-account-icon">
                        delete_forever
                      </i>
                      Delete Account
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
                        onClick={this.handle_delete_account}
                      >
                        Delete
                      </Button>
                    </div>
                  }
                >
                  <img src={modal_logo} alt="" />
                  <div className="bold-text delete-modal-heading jeopardy-blue-dark-text">
                    Delete Account
                  </div>
                  <p className="warning-text">
                    Are you sure you want to delete your account?
                  </p>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { delete_profile, delete_account })(
  withRouter(Account)
);
