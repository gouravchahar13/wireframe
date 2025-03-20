import { create } from 'zustand';
import { ImageState } from '../types';

export const useImageStore = create<ImageState>((set) => ({
  adjustments: {
    brightness: 100,
    contrast: 100,
    sharpness: 100,
  },
  setAdjustment: (type, value) =>
    set((state) => ({
      adjustments: {
        ...state.adjustments,
        [type]: value,
      },
    })),
}));