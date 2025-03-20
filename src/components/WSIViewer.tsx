import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useViewportStore } from '../store/viewportStore';
import { useImageStore } from '../store/imageStore';
import { DetectionResult } from '../types';

interface WSIViewerProps {
  imageUrl: string;
  detectionResults: DetectionResult[];
  onCellClick?: (result: DetectionResult) => void;
}

export const WSIViewer: React.FC<WSIViewerProps> = ({ 
  imageUrl, 
  detectionResults,
  onCellClick 
}) => {
  const setViewport = useViewportStore((state) => state.setViewport);
  const { adjustments } = useImageStore();
  const [selectedCell, setSelectedCell] = useState<DetectionResult | null>(null);

  const handleCellClick = (result: DetectionResult, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedCell(result);
    onCellClick?.(result);
  };

  const imageStyle = {
    filter: `
      brightness(${adjustments.brightness}%) 
      contrast(${adjustments.contrast}%)
      ${adjustments.sharpness > 100 ? `sharpen(${(adjustments.sharpness - 100) / 50})` : ''}
    `,
  };

  return (
    <div className="flex-1 relative">
      <TransformWrapper
        initialScale={1}
        onTransformed={(e) => {
          setViewport(
            e.state.scale,
            e.state.positionX,
            e.state.positionY
          );
        }}
        wheel={{ step: 0.1 }}
        alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
        velocityAnimation={{ equalToMove: true }}
      >
        <TransformComponent
          wrapperClass="w-full h-full"
          contentClass="w-full h-full"
        >
          <div className="relative">
            <img
              src={imageUrl}
              alt="Blood Cell Analysis"
              className="w-full h-full object-contain"
              style={imageStyle}
            />
            {detectionResults.map((result, index) => {
              const [x, y, width, height, className] = result.bbox;
              const imageWidth = 1024;
              const imageHeight = 512;
              
              const xPercent = (x / imageWidth) * 100;
              const yPercent = (y / imageHeight) * 100;
              const widthPercent = ((width - x) / imageWidth) * 100;
              const heightPercent = ((height - y) / imageHeight) * 100;

              const isSelected = selectedCell === result;

              return (
                <div
                  key={index}
                  className={`absolute border-2 cursor-pointer transition-colors duration-200 ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-100 bg-opacity-30' 
                      : 'border-red-500 bg-red-100 bg-opacity-20 hover:bg-red-100 hover:bg-opacity-30'
                  }`}
                  style={{
                    left: `${xPercent}%`,
                    top: `${yPercent}%`,
                    width: `${widthPercent}%`,
                    height: `${heightPercent}%`,
                  }}
                  onClick={(e) => handleCellClick(result, e)}
                >
                  <div className={`absolute top-0 left-0 transform -translate-y-full px-2 py-1 text-xs rounded ${
                    isSelected ? 'bg-blue-500' : 'bg-red-500'
                  } text-white`}>
                    {className}
                  </div>
                </div>
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};