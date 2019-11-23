import React, { Component } from "react";
import { connect } from "react-redux";
import { withAlert } from "react-alert";

class Alert extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate = () => {};

  render() {
    const alert = this.props.alert;
    console.log(this.props)
    return (
      <button
        onClick={() => {
          alert.show("Oh look, an alert!");
        }}
      >
        Show Alert
      </button>
    );
  }
}

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default withAlert()(connect(mapStateToProps)(Alert));
