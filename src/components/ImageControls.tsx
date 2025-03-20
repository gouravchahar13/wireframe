import React from 'react';
import { Sun, Contrast, Focus } from 'lucide-react';
import { useImageStore } from '../store/imageStore';

export const ImageControls: React.FC = () => {
  const { adjustments, setAdjustment } = useImageStore();

  const controls = [
    { name: 'brightness', icon: Sun, value: adjustments.brightness },
    { name: 'contrast', icon: Contrast, value: adjustments.contrast },
    { name: 'sharpness', icon: Focus, value: adjustments.sharpness },
  ];

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm">
      <div className="grid grid-cols-3 gap-2">
        {controls.map(({ name, icon: Icon, value }) => (
          <div key={name} className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-sm">
              <Icon className="w-3 h-3" />
              <span className="capitalize text-xs">{name}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={value}
              onChange={(e) => setAdjustment(name as any, Number(e.target.value))}
              className="w-full h-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};