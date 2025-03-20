import React from 'react';
import { useViewportStore } from '../store/viewportStore';

interface HubViewProps {
  imageUrl: string;
}

export const HubView: React.FC<HubViewProps> = ({ imageUrl }) => {
  const { scale, positionX, positionY } = useViewportStore();
  
  const pointerStyle = {
    left: `${50 - (positionX / scale) * 50}%`,
    top: `${50 - (positionY / scale) * 50}%`,
    width: `${100 / scale}%`,
    height: `${100 / scale}%`,
  };

  return (
    <div className="w-64 h-64 relative border border-gray-200 rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt="Hub view"
        className="w-full h-full object-cover"
      />
      <div
        className="absolute border-2 border-blue-500 bg-blue-100 bg-opacity-20 pointer-events-none"
        style={pointerStyle}
      />
    </div>
  );
};