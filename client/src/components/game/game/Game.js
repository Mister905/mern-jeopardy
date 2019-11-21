import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Category from '../category/Category';
import Clue from '../clue/clue/Clue';
import Score from '../score/Score';
import { activate_game, load_round, load_game_over } from '../../../actions/game';
import Loader from '../../layout/loader/Loader';
import Final_Jeopardy from '../final_jeopardy/Final_Jeopardy';
import Game_Over from '../game_over/Game_Over';
import New_High_Score from '../new_high_score/New_High_Score';

class Game extends Component {

    constructor(props) {
        super(props);
        document.body.classList.add('jeopardy-blue-dark');
    }

    componentDidMount = () => {
        const {
            is_second_round,
            is_final_jeopardy,
            answered_questions,
            first_round_categories,
            second_round_categories,
            winnings,
            is_new_game
        } = this.props.game;
 
        if (is_new_game) {
            const game_data = {
                round: 1
            }
            this.props.activate_game();
            this.props.load_round(game_data);
        }

        if (answered_questions.length === 30) {
            console.log('answered_questions.length === 30')
            if (is_second_round) {
                const game_data = {
                    round: 2,
                    first_round_categories
                }
                this.props.load_round(game_data)
            } else if (is_final_jeopardy) {
                if (winnings <= 0) {
                    this.render_end();
                } else {
                    const game_data = {
                        round: 3,
                        first_round_categories,
                        second_round_categories
                    }
                    this.props.load_round(game_data)
                }
            } 
        }
    }

    componentDidUpdate = () => {
        const {
            loading_game_over,
            final_earnings
        } = this.props.game;
        if (loading_game_over) {
            const { user } = this.props.auth;
            const { name } = this.props.auth.user;
            const payload = {
                user_id: user._id,
                username: name,
                final_earnings
            }
            this.props.load_game_over(payload);       
        }
    }

    render_first_round = () => {
        const {
            first_round_categories,
            first_round_questions,
            answered_questions
        } = this.props.game;

        return (
            <div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[0][0].id) ? (
                                <Clue key={first_round_questions[0][0].id} clue={first_round_questions[0][0]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[0][0]
                                    }}>
                                        <Clue key={first_round_questions[0][0].id} clue={first_round_questions[0][0]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[1][0].id) ? (
                                <Clue key={first_round_questions[1][0].id} clue={first_round_questions[1][0]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[1][0]
                                    }}>
                                        <Clue key={first_round_questions[1][0].id} clue={first_round_questions[1][0]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[2][0].id) ? (
                                <Clue key={first_round_questions[2][0].id} clue={first_round_questions[2][0]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[2][0]
                                    }}>
                                        <Clue key={first_round_questions[2][0].id} clue={first_round_questions[2][0]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[3][0].id) ? (
                                <Clue key={first_round_questions[3][0].id} clue={first_round_questions[3][0]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[3][0]
                                    }}>
                                        <Clue key={first_round_questions[3][0].id} clue={first_round_questions[3][0]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[4][0].id) ? (
                                <Clue key={first_round_questions[4][0].id} clue={first_round_questions[4][0]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[4][0]
                                    }}>
                                        <Clue key={first_round_questions[4][0].id} clue={first_round_questions[4][0]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[5][0].id) ? (
                                <Clue key={first_round_questions[5][0].id} clue={first_round_questions[5][0]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[5][0]
                                    }}>
                                        <Clue key={first_round_questions[5][0].id} clue={first_round_questions[5][0]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[0][1].id) ? (
                                <Clue key={first_round_questions[0][1].id} clue={first_round_questions[0][1]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[0][1]
                                    }}>
                                        <Clue key={first_round_questions[0][1].id} clue={first_round_questions[0][1]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[1][1].id) ? (
                                <Clue key={first_round_questions[1][1].id} clue={first_round_questions[1][1]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[1][1]
                                    }}>
                                        <Clue key={first_round_questions[1][1].id} clue={first_round_questions[1][1]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[2][1].id) ? (
                                <Clue key={first_round_questions[2][1].id} clue={first_round_questions[2][1]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[2][1]
                                    }}>
                                        <Clue key={first_round_questions[2][1].id} clue={first_round_questions[2][1]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[3][1].id) ? (
                                <Clue key={first_round_questions[3][1].id} clue={first_round_questions[3][1]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[3][1]
                                    }}>
                                        <Clue key={first_round_questions[3][1].id} clue={first_round_questions[3][1]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[4][1].id) ? (
                                <Clue key={first_round_questions[4][1].id} clue={first_round_questions[4][1]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[4][1]
                                    }}>
                                        <Clue key={first_round_questions[4][1].id} clue={first_round_questions[4][1]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[5][1].id) ? (
                                <Clue key={first_round_questions[5][1].id} clue={first_round_questions[5][1]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[5][1]
                                    }}>
                                        <Clue key={first_round_questions[5][1].id} clue={first_round_questions[5][1]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[0][2].id) ? (
                                <Clue key={first_round_questions[0][2].id} clue={first_round_questions[0][2]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[0][2]
                                    }}>
                                        <Clue key={first_round_questions[0][2].id} clue={first_round_questions[0][2]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[1][2].id) ? (
                                <Clue key={first_round_questions[1][2].id} clue={first_round_questions[1][2]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[1][2]
                                    }}>
                                        <Clue key={first_round_questions[1][2].id} clue={first_round_questions[1][2]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[2][2].id) ? (
                                <Clue key={first_round_questions[2][2].id} clue={first_round_questions[2][2]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[2][2]
                                    }}>
                                        <Clue key={first_round_questions[2][2].id} clue={first_round_questions[2][2]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[3][2].id) ? (
                                <Clue key={first_round_questions[3][2].id} clue={first_round_questions[3][2]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[3][2]
                                    }}>
                                        <Clue key={first_round_questions[3][2].id} clue={first_round_questions[3][2]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[4][2].id) ? (
                                <Clue key={first_round_questions[4][2].id} clue={first_round_questions[4][2]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[4][2]
                                    }}>
                                        <Clue key={first_round_questions[4][2].id} clue={first_round_questions[4][2]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[5][2].id) ? (
                                <Clue key={first_round_questions[5][2].id} clue={first_round_questions[5][2]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[5][2]
                                    }}>
                                        <Clue key={first_round_questions[5][2].id} clue={first_round_questions[5][2]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[0][3].id) ? (
                                <Clue key={first_round_questions[0][3].id} clue={first_round_questions[0][3]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[0][3]
                                    }}>
                                        <Clue key={first_round_questions[0][3].id} clue={first_round_questions[0][3]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[1][3].id) ? (
                                <Clue key={first_round_questions[1][3].id} clue={first_round_questions[1][3]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[1][3]
                                    }}>
                                        <Clue key={first_round_questions[1][3].id} clue={first_round_questions[1][3]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[2][3].id) ? (
                                <Clue key={first_round_questions[2][3].id} clue={first_round_questions[2][3]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[2][3]
                                    }}>
                                        <Clue key={first_round_questions[2][3].id} clue={first_round_questions[2][3]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[3][3].id) ? (
                                <Clue key={first_round_questions[3][3].id} clue={first_round_questions[3][3]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[3][3]
                                    }}>
                                        <Clue key={first_round_questions[3][3].id} clue={first_round_questions[3][3]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[4][3].id) ? (
                                <Clue key={first_round_questions[4][3].id} clue={first_round_questions[4][3]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[4][3]
                                    }}>
                                        <Clue key={first_round_questions[4][3].id} clue={first_round_questions[4][3]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[5][3].id) ? (
                                <Clue key={first_round_questions[5][3].id} clue={first_round_questions[5][3]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[5][3]
                                    }}>
                                        <Clue key={first_round_questions[5][3].id} clue={first_round_questions[5][3]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[0][4].id) ? (
                                <Clue key={first_round_questions[0][4].id} clue={first_round_questions[0][4]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[0][4]
                                    }}>
                                        <Clue key={first_round_questions[0][4].id} clue={first_round_questions[0][4]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[1][4].id) ? (
                                <Clue key={first_round_questions[1][4].id} clue={first_round_questions[1][4]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[1][4]
                                    }}>
                                        <Clue key={first_round_questions[1][4].id} clue={first_round_questions[1][4]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[2][4].id) ? (
                                <Clue key={first_round_questions[2][4].id} clue={first_round_questions[2][4]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[2][4]
                                    }}>
                                        <Clue key={first_round_questions[2][4].id} clue={first_round_questions[2][4]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[3][4].id) ? (
                                <Clue key={first_round_questions[3][4].id} clue={first_round_questions[3][4]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[3][4]
                                    }}>
                                        <Clue key={first_round_questions[3][4].id} clue={first_round_questions[3][4]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[4][4].id) ? (
                                <Clue key={first_round_questions[4][4].id} clue={first_round_questions[4][4]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[4][4]
                                    }}>
                                        <Clue key={first_round_questions[4][4].id} clue={first_round_questions[4][4]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(first_round_questions[5][4].id) ? (
                                <Clue key={first_round_questions[5][4].id} clue={first_round_questions[5][4]} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: first_round_questions[5][4]
                                    }}>
                                        <Clue key={first_round_questions[5][4].id} clue={first_round_questions[5][4]} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
            </div>
        );
    }

    render_second_round = () => {
        const {
            second_round_categories,
            second_round_questions,
            answered_questions
        } = this.props.game;

        return (
            <div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[0][0].id) ? (
                                <Clue key={second_round_questions[0][0].id} clue={{ value: 400 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 400,
                                            question: second_round_questions[0][0]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[0][0].id} clue={{ value: 400 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[1][0].id) ? (
                                <Clue key={second_round_questions[1][0].id} clue={{ value: 400 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 400,
                                            question: second_round_questions[1][0]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[1][0].id} clue={{ value: 400 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[2][0].id) ? (
                                <Clue key={second_round_questions[2][0].id} clue={{ value: 400 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 400,
                                            question: second_round_questions[2][0]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[2][0].id} clue={{ value: 400 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[3][0].id) ? (
                                <Clue key={second_round_questions[3][0].id} clue={{ value: 400 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 400,
                                            question: second_round_questions[3][0]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[3][0].id} clue={{ value: 400 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[4][0].id) ? (
                                <Clue key={second_round_questions[4][0].id} clue={{ value: 400 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 400,
                                            question: second_round_questions[4][0]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[4][0].id} clue={{ value: 400 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[5][0].id) ? (
                                <Clue key={second_round_questions[5][0].id} clue={{ value: 400 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 400,
                                            question: second_round_questions[5][0]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[5][0].id} clue={{ value: 400 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[0][1].id) ? (
                                <Clue key={second_round_questions[0][1].id} clue={{ value: 800 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 800,
                                            question: second_round_questions[0][1]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[0][1].id} clue={{ value: 800 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[1][1].id) ? (
                                <Clue key={second_round_questions[1][1].id} clue={{ value: 800 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 800,
                                            question: second_round_questions[1][1]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[1][1].id} clue={{ value: 800 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[2][1].id) ? (
                                <Clue key={second_round_questions[2][1].id} clue={{ value: 800 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 800,
                                            question: second_round_questions[2][1]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[2][1].id} clue={{ value: 800 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[3][1].id) ? (
                                <Clue key={second_round_questions[3][1].id} clue={{ value: 800 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 800,
                                            question: second_round_questions[3][1]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[3][1].id} clue={{ value: 800 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[4][1].id) ? (
                                <Clue key={second_round_questions[4][1].id} clue={{ value: 800 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 800,
                                            question: second_round_questions[4][1]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[4][1].id} clue={{ value: 800 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[5][1].id) ? (
                                <Clue key={second_round_questions[5][1].id} clue={{ value: 800 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 800,
                                            question: second_round_questions[5][1]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[5][1].id} clue={{ value: 800 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[0][2].id) ? (
                                <Clue key={second_round_questions[0][2].id} clue={{ value: 1200 }}  visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1200,
                                            question: second_round_questions[0][2]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[0][2].id} clue={{ value: 1200 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[1][2].id) ? (
                                <Clue key={second_round_questions[1][2].id} clue={{ value: 1200 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1200,
                                            question: second_round_questions[1][2]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[1][2].id} clue={{ value: 1200 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[2][2].id) ? (
                                <Clue key={second_round_questions[2][2].id} clue={{ value: 1200 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1200,
                                            question: second_round_questions[2][2]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[2][2].id} clue={{ value: 1200 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[3][2].id) ? (
                                <Clue key={second_round_questions[3][2].id} clue={{ value: 1200 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1200,
                                            question: second_round_questions[3][2]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[3][2].id} clue={{ value: 1200 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[4][2].id) ? (
                                <Clue key={second_round_questions[4][2].id} clue={{ value: 1200 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1200,
                                            question: second_round_questions[4][2]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[4][2].id} clue={{ value: 1200 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[5][2].id) ? (
                                <Clue key={second_round_questions[5][2].id} clue={{ value: 1200 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1200,
                                            question: second_round_questions[5][2]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[5][2].id} clue={{ value: 1200 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[0][3].id) ? (
                                <Clue key={second_round_questions[0][3].id} clue={{ value: 1600 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1600,
                                            question: second_round_questions[0][3]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[0][3].id} clue={{ value: 1600 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[1][3].id) ? (
                                <Clue key={second_round_questions[1][3].id} clue={{ value: 1600 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1600,
                                            question: second_round_questions[1][3]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[1][3].id} clue={{ value: 1600 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[2][3].id) ? (
                                <Clue key={second_round_questions[2][3].id} clue={{ value: 1600 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1600,
                                            question: second_round_questions[2][3]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[2][3].id} clue={{ value: 1600 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[3][3].id) ? (
                                <Clue key={second_round_questions[3][3].id} clue={{ value: 1600 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1600,
                                            question: second_round_questions[3][3]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[3][3].id} clue={{ value: 1600 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[4][3].id) ? (
                                <Clue key={second_round_questions[4][3].id} clue={{ value: 1600 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1600,
                                            question: second_round_questions[4][3]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[4][3].id} clue={{ value: 1600 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[5][3].id) ? (
                                <Clue key={second_round_questions[5][3].id} clue={{ value: 1600 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 1600,
                                            question: second_round_questions[5][3]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[5][3].id} clue={{ value: 1600 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
                <div className="row question-row">
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[0][4].id) ? (
                                <Clue key={second_round_questions[0][4].id} clue={{ value: 2000 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 2000,
                                            question: second_round_questions[0][4]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[0][4].id} clue={{ value: 2000 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[1][4].id) ? (
                                <Clue key={second_round_questions[1][4].id} clue={{ value: 2000 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 2000,
                                            question: second_round_questions[1][4]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[1][4].id} clue={{ value: 2000 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[2][4].id) ? (
                                <Clue key={second_round_questions[2][4].id} clue={{ value: 2000 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 2000,
                                            question: second_round_questions[2][4]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[2][4].id} clue={{ value: 2000 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[3][4].id) ? (
                                <Clue key={second_round_questions[3][4].id} clue={{ value: 2000 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 2000,
                                            question: second_round_questions[3][4]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[3][4].id} clue={{ value: 2000 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[4][4].id) ? (
                                <Clue key={second_round_questions[4][4].id} clue={{ value: 2000 }} visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 2000,
                                            question: second_round_questions[4][4]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[4][4].id} clue={{ value: 2000 }} visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                    <div className="col m2">
                        {
                            answered_questions.includes(second_round_questions[5][4].id) ? (
                                <Clue key={second_round_questions[5][4].id} clue={{ value: 2000 }}  visible={false} />
                            ) : (
                                    <Link to={{
                                        pathname: "/clue",
                                        state: {
                                            custom: 2000,
                                            question: second_round_questions[5][4]
                                        }
                                    }}>
                                        <Clue key={second_round_questions[5][4].id} clue={{ value: 2000 }}  visible={true} />
                                    </Link>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }

    render_final_jeopardy = () => {
        return (
            <div>
                <Final_Jeopardy />
            </div>
        );
    }

    render_game_over = () => {
        return (
            <div>
                <Game_Over />
            </div>
        )
    }

    render_new_high_score = () => {
        return (
            <div>
                <New_High_Score />
            </div>
        )
    }

    render() {
        const {
            is_first_round,
            is_second_round,
            first_round_categories,
            second_round_categories,
            winnings,
            loading_round,
            is_final_jeopardy,
            loading_game_over,
            is_game_over,
            is_new_high_score
        } = this.props.game;

        if (loading_round) {
            if (is_first_round) {
                return (
                    <div className="row loader-row">
                        <div className="col m12 center-align">
                            <Loader round={1}/>
                        </div>
                    </div>
                )
            } else if (is_second_round) {
                return (
                    <div className="row loader-row">
                        <div className="col m12 center-align">
                            <Loader round={2}/>
                        </div>
                    </div>
                )
            } else if (is_final_jeopardy) {
                return (
                    <div className="row loader-row">
                        <div className="col m12 center-align">
                            <Loader round={3}/>
                        </div>
                    </div>
                )
            }
        } 
        if (loading_game_over) {
            return (
                <div className="row loader-row">
                    <div className="col m12 center-align">
                        <Loader round={4}/>
                    </div>
                </div>
            )
        }
        if (is_first_round) {
            return (
                <div>
                    <Score winnings={winnings} round={1} />
                    <div className="row category-row">
                        {first_round_categories.map((category, i) => {
                            return (
                                <div className="col m2" key={category.id}>
                                    <Category title={category.title} />
                                </div>
                            )
                        })}
                    </div>
                    {this.render_first_round()}
                </div>
            );
        } else if (is_second_round) {
            return (
                <div>
                    <Score winnings={winnings} round={2} />
                    <div className="row category-row">
                        {second_round_categories.map((category, i) => {
                            return (
                                <div className="col m2" key={category.id}>
                                    <Category title={category.title} />
                                </div>
                            )
                        })}
                    </div>
                    {this.render_second_round()}
                </div>
            );
        } else if (is_final_jeopardy) {
            return (
                <div>
                    <div className="row">
                        {this.render_final_jeopardy()}
                    </div>
                </div>
            )
        } else if (is_game_over) {
            return (
                <div>
                    <div className="row end-row">
                        {this.render_game_over()}
                    </div>
                </div>
            )
        } else if (is_new_high_score) {
            return (
                <div>
                    <div className="row end-row">
                        {this.render_new_high_score()}
                    </div>
                </div>
            )
        } 
    }
}

Game.propTypes = {
    game: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    game: state.game
});

export default connect(
    mapStateToProps, 
    { 
        activate_game,
        load_round,
        load_game_over 
    }
)(Game);