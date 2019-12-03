const express = require("express");
const config = require('config');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const path = require('path');

// MIDDLEWARE
app.use(express.json({ extended: false }));
var corsOptions = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsOptions));

// DB Config
const mongo_URI = config.get('mongo_URI')
// Connect to MongoDB
mongoose
    .connect(
        mongo_URI,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// ROUTES
const auth = require("./routes/api/auth");
app.use('/api/auth', auth);
const profile = require('./routes/api/profile');
app.use('/api/profile', profile);
const game = require('./routes/api/game');
app.use('/api/game', game);
const statistics = require('./routes/api/statistics');
app.use('/api/statistics', statistics);
const score = require("./routes/api/score");
app.use('/api/score', score);
const experience = require("./routes/api/experience");
app.use('/api/experience', experience);
const settings = require("./routes/api/settings");
app.use('/api/settings', settings);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server running on port ${port}`));