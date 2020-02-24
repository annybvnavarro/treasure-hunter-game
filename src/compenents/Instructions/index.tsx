import React from 'react';
import logo from './LOGO.png';

import "./Instructions.scss";

const Instructions: React.FC = () => {

    return (
        <div>
            <img src={logo} width="90%" alt="Treasure Hunter Game" /><br />
            <strong className="Heading">HOW TO PLAY :D</strong><br />
            <div className="Headline">Goal: Find the three hidden treasures (<span role="img" aria-label="treasure">👑</span>) in the minimum number of turns possible. </div>
            <div className="HowToPlay">
                <div className="Tip">1. Put your username in so we can keep your scores.</div>
                <div className="Tip">2. Choose up to three (3) spots on the game board.</div>
                <div className="Tip">3. Reveal them and use the tips to find the next treasure.</div>
                <div className="Tip">4. The proximity is defined by the higher(3) is closer to the treasure as the lower(0/1) is the farthest.</div>
                <div className="Tip">5. Your score is based on the number of turns you used so far...the lower the score, the best.</div>
                <div className="Tip">6. Have fun :D</div>
            </div>
        </div>
    )

};

export default Instructions;