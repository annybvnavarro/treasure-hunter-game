const express = require('express');
const cors = require('cors');

require ('dotenv').config();

const app = express();
const port = process.env.PORT || 8383;

app.use(cors());
app.use(express.json());

const playersRouter = require('./routes/players');
const boardRouter = require('./routes/gameBoard');

app.use('/players', playersRouter);
app.use('/board', boardRouter);

app.listen(port, () => {
    console.log(`Our game server API is running on port ${port}`);
})