import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import gameReducer from './gameReducer';
import experienceReducer from './experienceReducer';
import statisticsReducer from './statisticsReducer';
import leaderboardReducer from './leaderboardReducer';

export default combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    game: gameReducer,
    experience: experienceReducer,
    statistics: statisticsReducer,
    leaderboard: leaderboardReducer
});