import React, { Component } from "react";
import { connect } from "react-redux";
import { withAlert } from "react-alert";

class Alert extends Component {
  componentDidUpdate = prevProps => {
    if (this.props.alerts.alert.id !== prevProps.alerts.alert.id) {
      const alert = this.props.alert;
      alert.show(this.props.alerts.alert.msg, { type: 'error' });
    }
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default withAlert()(connect(mapStateToProps)(Alert));
