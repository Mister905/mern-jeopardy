import React, { Component } from 'react'

class Clue extends Component {
    render() {
        const { visible } = this.props;

        const { value } = this.props.clue;

        if (visible) {
            return (
                <div className="card custom-card jeopardy-blue">
                    <div className="card-content custom-card-content">
                        <span className="card-title center-align clue-value flow-text">${ value }</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="card custom-card jeopardy-blue">
                    <div className="card-content custom-card-content">
                        <span className="card-title center-align clue-value flow-text"></span>
                    </div>
                </div>
            );
        }
    }
}

export default Clue;