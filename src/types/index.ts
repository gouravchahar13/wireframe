export interface DetectionResult {
  bbox: [number, number, number, number, string];
  confidence?: number;
  selected?: boolean;
}

export interface WSIData {
  id: number;
  patient_id: string;
  inference_results: string;
  celery_status: string;
  filename: string;
  sample_type: string;
  date: string;
  parsedResults?: DetectionResult[];
}

export interface ViewportState {
  scale: number;
  positionX: number;
  positionY: number;
  setViewport: (scale: number, positionX: number, positionY: number) => void;
}

export interface ImageAdjustments {
  brightness: number;
  contrast: number;
  sharpness: number;
}

export interface ImageState {
  adjustments: ImageAdjustments;
  setAdjustment: (type: keyof ImageAdjustments, value: number) => void;
}