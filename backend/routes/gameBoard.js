//Router responsible for handling board manipulation

const router = require('express').Router();

//The controller handles the board generation + Checking for treasures
const gameBoard = require('../src/controllers/gameBoard');

router.route('/generateboard').post((req, res) => {
    gameBoard.generate_board(req.body, function cab(resp) {
        res.json(resp);
    });
});

router.route('/checktreasures').post((req, res) => {
    gameBoard.check_treasures(req.body, function cab(resp) {
        res.json(resp);
    });
});

module.exports = router;