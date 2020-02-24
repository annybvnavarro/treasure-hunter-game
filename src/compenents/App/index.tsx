import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Points from '../Points';
import Instructions from '../Instructions';
import Spot from '../Spot';
import { createChoices, generateBoard } from "../../utils";
import { Choice, Spots, SpotState, SpotContent } from '../../types';
import SweetAlert from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import "./App.scss";

const App: React.FC = () => {

    const [spots, setSpots] = useState<Spots[][]>(generateBoard());
    const [choices, setChoices] = useState<Choice[][]>(createChoices());
    const [score, setScore] = useState<number>(0);
    const [highestScore, setHighestScore] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [name, setName] = useState('');
    const [flag, setFlag] = useState<number>(3);
    const swal = withReactContent(SweetAlert);

    useEffect(() => {
        if (localStorage.getItem('playing')){
            setName(localStorage.getItem('player') || '');
            setSpots(JSON.parse(localStorage.getItem('board') || '{}'));
            setScore(parseInt(localStorage.getItem('points') || '0'));
            setPlaying(true);}
      }, []);

    const renderBoard = (): React.ReactNode => {
        return spots.map((r, rIndex) =>
            r.map((spot, cIndex) =>
                <Spot
                    key={`${rIndex}-${cIndex}`}
                    row={rIndex}
                    col={cIndex}
                    state={spot.state}
                    content={spot.content}
                    onClick={handleSpotClick} />));
    };

    const handleGameStart = () => {
        getHighestScore();
        if (name === '' || !name.replace(/\s/g, '').length) {
            swal.fire('', 'Please, put in your name. :D', 'error');
            return;
        }
            const sizeBoard = {
                sizeBoard: 5
            }
            if (!playing) {
    
                axios.post('http://localhost:8383/board/generateboard', sizeBoard);
                setPlaying(true);
                localStorage.setItem('player', name);
                localStorage.setItem('playing', 'true');
            } else {
                axios.post('http://localhost:8383/board/generateboard', sizeBoard);
                setScore(0);
                setChoices(createChoices());
                setSpots(generateBoard());
                localStorage.setItem('player', name);
        }
    };

    const handleSpotClick = (paramRow: number, paramCol: number) => (): void => {
        const chosenSpot = spots[paramRow][paramCol];
        const newBoard = spots.slice();

        if (!playing) {
            swal.fire('', 'Start the game first... :)', 'error');
            return;
        }

        if (chosenSpot.state === SpotState.closed && flag > 0) {
            newBoard[paramRow][paramCol].state = SpotState.selected;
            choices[paramRow][paramCol].flagged = true;
            setFlag(flag - 1);
            setSpots(newBoard);
        } else if (chosenSpot.state === SpotState.selected) {
            newBoard[paramRow][paramCol].state = SpotState.closed;
            choices[paramRow][paramCol].flagged = false;
            setFlag(flag + 1);
            setSpots(newBoard);
        } else if (chosenSpot.state === SpotState.opened) {
            return;
        }
    };

    const handleSubmitClick = () => {
        
        if(!playing){
            swal.fire('', 'Please, start the game first! ;D', 'error');
            return;
        }
        if (flag === 3) {
            swal.fire('', 'Please, select at least one spot! ;P', 'error');
            return;
        } else {
            axios.post('http://localhost:8383/board/checktreasures', choices)
                .then(res => {
                    let treasures = 0;
                    for (let checkrow = 0; checkrow < 5; checkrow++) {
                        for (let checkcol = 0; checkcol < 5; checkcol++) {
                            if (res.data[checkrow][checkcol].content === SpotContent.treasure)
                                treasures++;
                        }
                    }
                    setSpots(res.data);
                    setChoices(createChoices());
                    setFlag(3);
                    localStorage.setItem('board', JSON.stringify(res.data));
                    localStorage.setItem('points', ""+(score+1));
                    setScore(score + 1);
                    if (treasures === 3) {
                        endGame();
                    }
                });
        }
    };

    const handleHighestScoresClick = () => {

        axios.get('http://localhost:8383/players/list')
            .then(res => {
                let PlayerScores = '';
                if (res.data.length > 0){

                
                PlayerScores = '<span class="TitleHighestScores"> Here are our best players! :D</span> <div class="HighestScores">';
                for (var index in res.data) {
                    let i = +index + 1;
                    if (+index < 10) {
                        PlayerScores = PlayerScores +
                            ' <div class="PlayerHighestScores">' +
                            i + '. '
                            + res.data[index].player +
                        ' </div><div class="PointsHighestScores">' +
                            res.data[index].points +
                            ' Points </div><br />';
                    }
                }
                PlayerScores = PlayerScores + '</div>'; 
            } else { PlayerScores = '<span class="TitleHighestScores"> We have no players yet! :/</span>' }
                swal.fire({
                    title: '',
                    html: PlayerScores,
                    showCloseButton: true,
                    showConfirmButton: false,
                })
            });
    };

    const endGame = () => {
        const player = {
            player: name,
            points: score
        }
        
        axios.post('http://localhost:8383/players/newplayer', player).then(res => {

            swal.fire({
                title: 'Congratulations!',
                text: 'You made ' + score + ' Points! :D',
                showCloseButton: true,
                onClose: () => {
                    handleHighestScoresClick();
                  }
              })
            
        });
        localStorage.clear();
        setPlaying(false);
        setScore(0);
        setChoices(createChoices());
        setSpots(generateBoard());
        getHighestScore();
    };

    const getHighestScore = () => {
        axios.get('http://localhost:8383/players/list').then(res => { if (res.data.length >0) setHighestScore(res.data[0].points)});
    };

    getHighestScore();

    return (
        <div className="Window">
            <div className="Game">
                <div className="Instructions">
                    <Instructions />
                    <div className="Button" onClick={handleHighestScoresClick}>Highest Scores</div>
                </div>
                <div className="App">
                    <div className="GameHeader">
                        <div className="GamePlayer">
                            Tell us your name so we can <br />brag about your scores :D
                    <br />
                            <input className="PlayerInput" type="text" value={name} onChange={e => setName(e.target.value)} />
                            <div className="Button" onClick={handleGameStart}>{playing ? 'Restart Game' : 'Start Game'}</div>
                        </div>
                        <div className="GameScores">
                            <div className="Score CurrentScore">
                                <strong>Your Score</strong>
                                <Points points={score} />
                            </div>
                            <div className="Score">
                                <strong>Highest Score</strong>
                                <Points points={highestScore} />
                            </div>
                        </div>
                    </div>
                    <div className="GameBody">
                        {renderBoard()}
                    </div>
                    <div className="GameFooter">
                        <div className="Score CurrentScore">
                            <strong>Remaining Choices</strong>
                            <Points points={flag} />
                        </div>
                        <div className="Button" onClick={handleSubmitClick}>Reveal!</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default App;