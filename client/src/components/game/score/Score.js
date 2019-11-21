import React, { Component } from 'react'

class Score extends Component {

    number_with_commas = (x) => {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    render() {
        const { winnings, round } = this.props;
        return (
            <div>
                <div className="row score-card-row">
                    <div className="col m4 offset-m4">
                        <div className="card score-card jeopardy-blue">
                            <div className="row round-row">
                                <div className="col m12">
                                    <div className="jeopardy-white-text bold-text round-title">
                                        {round === 1 || round === 2 ? (
                                            `Round ${round}`
                                        ) : (
                                            `Final Jeopardy`
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row score-card-content-row">
                                <div className="col m12">
                                    <div className="card-content score-card-content jeopardy-blue">
                                        <div className="winnings-output center-align jeopardy-white-text">${this.number_with_commas(winnings)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Score;