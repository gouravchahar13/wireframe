import React from 'react';
import { DetectionResult } from '../types';

interface CellDetailsProps {
  cell: DetectionResult | null;
}

export const CellDetails: React.FC<CellDetailsProps> = ({ cell }) => {
  if (!cell) {
    return null;
  }

  const [x, y, width, height, type] = cell.bbox;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Cell Details</h3>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Type:</span> {type}
        </div>
        <div>
          <span className="font-medium">Position:</span> ({x}, {y})
        </div>
        <div>
          <span className="font-medium">Size:</span> {width - x}x{height - y} px
        </div>
      </div>
    </div>
  );
};