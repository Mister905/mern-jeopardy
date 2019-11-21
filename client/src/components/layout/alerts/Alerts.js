import React from 'react';
import Alert from '../alert/Alert';
import { connect } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const Alerts = ({ alerts }) => {
    return (
        <TransitionGroup>
            {alerts.map((alert) => (
                <CSSTransition
                    in={alerts !== null && alerts.length > 0}
                    key={alert.id}
                    timeout={500}
                    classNames="alert"
                >   
                    <Alert alert={alert}/>
                </CSSTransition>
            ))}
        </TransitionGroup>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
