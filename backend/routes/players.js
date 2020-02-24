//Router responsible for handling player information requests

const router = require('express').Router();

//All infomation that should come in the database will be available in a "data" file.
const playersData = require('../src/data/players');

router.route('/list').get((req, res) => {
    playersData.list(req.body, function cab(resp) {
        res.json(resp);
    });
});

router.route('/newplayer').post((req, res) => {
    playersData.new_player(req.body, function cab(resp) {
        res.json(resp);
    });
});

module.exports = router;