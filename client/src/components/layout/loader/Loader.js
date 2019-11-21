import React, { Component } from "react";

class Loader extends Component {
  render() {
    const { round } = this.props;
    if (round) {
      return (
        <div>
          <div className="row mt-row">
            <div className="col m12 center-align">
              {round === 1 && (
                <p className="bold-text loading-message jeopardy-white-text">
                  Loading Round 1...
                </p>
              )}
              {round === 2 && (
                <p className="bold-text loading-message jeopardy-white-text">
                  Loading Round 2...
                </p>
              )}
              {round === 3 && (
                <p className="bold-text loading-message jeopardy-white-text">
                  Loading Final Jeopardy...
                </p>
              )}
              {round === 4 && (
                <p className="bold-text loading-message jeopardy-white-text">
                  Game Over...
                </p>
              )}
            </div>
          </div>
          <div className="row mt-row">
            <div className="col m12 center-align">
              <div className="preloader-wrapper big active">
                <div className="spinner-layer custom-spinner-layer">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="row mt-row">
          <div className="col m12 center-align">
            <div className="preloader-wrapper big active">
              <div className="spinner-layer custom-spinner-layer">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div>
                <div className="gap-patch">
                  <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Loader;
