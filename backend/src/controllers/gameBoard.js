let board = [];
let boardFront = [];

class gameBoard {
    async generate_board(req, cab) {
        //Create board and assign the content and state as default
        board = [];
        for (var row = 0; row < req.sizeBoard; row++) {
            board.push([]);
            boardFront.push([]);
            for (var col = 0; col < req.sizeBoard; col++) {
                board[row].push({
                    content: 0,
                    state: 0
                });
            }
        }
        boardFront = board.slice();

        //Assign number of treasures
        let trasuresPlaced = 0;

        while (trasuresPlaced < 3) {

            const rowrand = Math.floor(Math.random() * req.sizeBoard);
            const colrand = Math.floor(Math.random() * req.sizeBoard);

            const leftT = rowrand > 0 && colrand > 0 ? board[rowrand - 1][colrand - 1] : null;
            const top = rowrand > 0 ? board[rowrand - 1][colrand] : null;
            const rightT = rowrand > 0 && colrand < req.sizeBoard - 1 ? board[rowrand - 1][colrand + 1] : null;
            const left = colrand > 0 ? board[rowrand][colrand - 1] : null;
            const right = colrand < req.sizeBoard - 1 ? board[rowrand][colrand + 1] : null;
            const leftB = rowrand < req.sizeBoard - 1 && colrand > 0 ? board[rowrand + 1][colrand - 1] : null;
            const bottom = rowrand < req.sizeBoard - 1 ? board[rowrand + 1][colrand] : null;
            const rightB = rowrand < req.sizeBoard - 1 && colrand < req.sizeBoard - 1 ? board[rowrand + 1][colrand + 1] : null;

            const currentSpot = board[rowrand][colrand];

            if (currentSpot.content !== 4) {

                board = board.map((row, rowI) => row.map((board, colI) => {
                    if (rowrand === rowI && colrand === colI) {
                        return {
                            ...board,
                            content: 4
                        };
                    }
                    return board;
                }));
                if (top && top.content !== 4) top.content = 3;
                if (bottom && bottom.content !== 4) bottom.content = 3;
                if (left && left.content !== 4) left.content = 3;
                if (right && right.content !== 4) right.content = 3;

                if (leftT && leftT.content !== 4 && leftT.content !== 3) leftT.content = 2;
                if (leftB && leftB.content !== 4 && leftB.content !== 3) leftB.content = 2;
                if (rightT && rightT.content !== 4 && rightT.content !== 3) rightT.content = 2;
                if (rightB && rightB.content !== 4 && rightB.content !== 3) rightB.content = 2;

                trasuresPlaced++;
            }
        }

        for (var rowAdj = 0; rowAdj < req.sizeBoard; rowAdj++) {
            for (var colAdj = 0; colAdj < req.sizeBoard; colAdj++) {
                
                const top = rowAdj > 0 ? board[rowAdj - 1][colAdj] : null;
                const left = colAdj > 0 ? board[rowAdj][colAdj - 1] : null;
                const right = colAdj < req.sizeBoard - 1 ? board[rowAdj][colAdj + 1] : null;
                const bottom = rowAdj < req.sizeBoard - 1 ? board[rowAdj + 1][colAdj] : null;

                if (board[rowAdj][colAdj].content === 0) {
                    if ((top && top.content === 3) || (bottom && bottom.content === 3) || (left && left.content === 3) ||  (right && right.content === 3)) { board[rowAdj][colAdj].content = 2}; 
                    
                }
            }
        }

        for (var rowAdj = 0; rowAdj < req.sizeBoard; rowAdj++) {
            for (var colAdj = 0; colAdj < req.sizeBoard; colAdj++) {
                
                const top = rowAdj > 0 ? board[rowAdj - 1][colAdj] : null;
                const left = colAdj > 0 ? board[rowAdj][colAdj - 1] : null;
                const right = colAdj < req.sizeBoard - 1 ? board[rowAdj][colAdj + 1] : null;
                const bottom = rowAdj < req.sizeBoard - 1 ? board[rowAdj + 1][colAdj] : null;

                if (board[rowAdj][colAdj].content === 0) {
                    if ((top && top.content === 2) || (bottom && bottom.content === 2) || (left && left.content === 2) ||  (right && right.content === 2)) {board[rowAdj][colAdj].content = 1};
                }
            }
        }

        cab('Done generating board!');
    };

    async check_treasures(req, cab) {
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {
                if (req[row][col].flagged === true) {
                    boardFront[row][col].state = 2;
                    boardFront[row][col].content = board[row][col].content;
                }
            }
        }
        cab(boardFront);
    };
}

module.exports = new gameBoard();