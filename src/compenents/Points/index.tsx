import React from 'react';

interface PointProps {
    points: number;
}

const Points: React.FC<PointProps> = ({ points }) => {
    return <div className="Points">
        {points}
    </div>
}

export default Points;