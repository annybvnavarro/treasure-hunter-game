import React from 'react';
import { SpotState, SpotContent } from '../../types';

import "./Spot.scss";
interface SpotProps {
    row: number;
    col: number;
    state: SpotState;
    content: SpotContent;
    onClick(paramRow: number, paramCol: number): (...args: any[]) => void;
}

const Spot: React.FC<SpotProps> = ({ row, col, state, content, onClick }) => {

    const renderSpotContent = (): React.ReactNode => {
        if (state === SpotState.opened) {
            if (content === SpotContent.treasure) {
                return (<span role="img" aria-label="treasure">👑</span>)
            }

            return content;
        } else if (state === SpotState.selected) {
            return (<span role="img" aria-label="selected">🏴‍☠️</span>)
        }

    }

    return (

        <div className={`Spot ${state === SpotState.opened ? "opened" : ""} 
                        ${state === SpotState.selected ? "selected" : ""} 
                        content-${content}`} onClick={onClick(row, col)}>
            {renderSpotContent()}
        </div>

    )
}

export default Spot;