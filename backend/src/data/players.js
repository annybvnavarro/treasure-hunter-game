let playersArray = [];  

class playersData {
    //List all players
    async list(req, cab){
        cab(playersArray);
    };

    //New player
    async new_player(req, cab){
        playersArray.push(req)
        playersArray.sort((a, b) => parseFloat(a.points) - parseFloat(b.points));
        cab('Done adding player!');
    };
}

module.exports = new playersData();