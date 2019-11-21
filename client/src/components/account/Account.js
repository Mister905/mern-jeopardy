import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { delete_profile, delete_account } from "../../actions/settings";
import { Modal, Button } from "react-materialize";

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
          <div className="col m10 offset-m1">
            <div className="card settings-card">
              <div className="card-content">
                <div className="row">
                  <div className="col m3">
                    <Link
                      to="/dashboard"
                      className="btn btn-small jeopardy-blue-dark hoverable bold-text btn-custom"
                    >
                      <i className="material-icons left  bold-text">
                        keyboard_backspace
                      </i>
                      Back
                    </Link>
                  </div>
                  <div className="col m4 offset-m1">
                    <div className="account-settings-header jeopardy-blue-dark-text bold-text center-align">
                      Account
                    </div>
                  </div>
                </div>
                {active_profile && (
                  <div className="row account-btn-row">
                    <div className="col m6 offset-m3">
                      <Modal
                        className="center-align jeopardy-blue-dark-text delete-record-modal"
                        header="Delete Profile"
                        trigger={
                          <Button className="btn btn btn-orange-border btn-wide btn-large jeopardy-blue-dark jeopardy-white-text btn-custom bold-text hoverable">
                            <i className="material-icons  left delete-icon">
                              delete
                            </i>
                            Delete Profile
                          </Button>
                        }
                        actions={
                          <div>
                            <Button
                              className="btn btn-custom bold-text btn-cancel"
                              modal="close"
                            >
                              Cancel
                            </Button>
                            <Button
                              className="btn btn-account-settings btn-custom bold-text"
                              modal="close"
                              onClick={this.handle_delete_profile}
                            >
                              Delete
                            </Button>
                          </div>
                        }
                      >
                        <p className="jeopardy-blue-dark-text bold-text">
                          Are you sure you want to delete your profile?
                        </p>
                      </Modal>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col m6 offset-m3">
                    <Modal
                      className="center-align jeopardy-blue-dark-text delete-record-modal"
                      header="Delete Record"
                      trigger={
                        <Button className="btn btn btn-orange-border btn-wide btn-large jeopardy-blue-dark jeopardy-white-text btn-custom bold-text hoverable">
                          <i className="material-icons  left delete-icon">
                            delete
                          </i>
                          Delete Account
                        </Button>
                      }
                      actions={
                        <div>
                          <Button
                            className="btn jeopardy-blue-dark jeopardy-white-text btn-custom bold-text btn-cancel"
                            modal="close"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="btn jeopardy-blue-dark jeopardy-white-text btn-custom bold-text"
                            modal="close"
                            onClick={this.handle_delete_account}
                          >
                            Delete
                          </Button>
                        </div>
                      }
                    >
                      <p className="jeopardy-blue-dark-text bold-text">
                        Are you sure you want to delete your account?
                      </p>
                    </Modal>
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

Account.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { delete_profile, delete_account }
)(withRouter(Account));
