import React from 'react';
import { FileText, ZoomIn, MousePointer, Microscope } from 'lucide-react';

interface LeftPanelProps {
  findings: string;
  cellCount: number;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({ findings, cellCount }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600">
        <Microscope className="w-6 h-6" />
        Blood Sample Analysis
      </h2>
      
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Analysis Results
          </h3>
          <p className="text-sm text-gray-700">{findings}</p>
          <div className="mt-3 bg-white rounded-md p-3 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{cellCount}</div>
            <div className="text-xs text-gray-600">Circular RBCs Detected</div>
          </div>
        </div>

        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-3 h-3" />
            <span>Scroll to zoom image</span>
          </div>
          <div className="flex items-center gap-2">
            <MousePointer className="w-3 h-3" />
            <span>Click cells for details</span>
          </div>
        </div>
      </div>
    </div>
  );
};