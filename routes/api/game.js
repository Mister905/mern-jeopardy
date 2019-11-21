const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth');
const axios = require('axios');

// const Profile = require('../../models/Profile');
// const User = require('../../models/User');

router.get('/get-random-questions', async (req, res) => {
    try {
        const jservice_res = await axios({
            method: 'get',
            url: 'http://jservice.io/api/random',
            params: {
                count: 100
            }
        });

        const clues = JSON.stringify(jservice_res, getCircularReplacer());

        res.send(JSON.stringify(clues));

    } catch (error) {
        console.log(error.message)
    }
});

router.get('/get-question', async (req, res) => {
    try {

        const jservice_res = await axios({
            method: 'get',
            url: 'http://jservice.io/api/clues',
            params: {
                value: req.query.value,
                category: req.query.category_id
            }
        });

        res.send(jservice_res.data);

    } catch (error) {
        console.log(error.message)
    }
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

module.exports = router;