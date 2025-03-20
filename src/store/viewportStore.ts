import { create } from 'zustand';
import { ViewportState } from '../types';

export const useViewportStore = create<ViewportState>((set) => ({
  scale: 1,
  positionX: 0,
  positionY: 0,
  setViewport: (scale, positionX, positionY) =>
    set({ scale, positionX, positionY }),
}));