import React, { useEffect, useState } from 'react';
import { LeftPanel } from './components/LeftPanel';
import { HubView } from './components/HubView';
import { WSIViewer } from './components/WSIViewer';
import { ImageControls } from './components/ImageControls';
import { CellDetails } from './components/CellDetails';
import { WSIData, DetectionResult } from './types';

function App() {
  const [wsiData, setWsiData] = useState<WSIData | null>(null);
  const [selectedCell, setSelectedCell] = useState<DetectionResult | null>(null);
  
  useEffect(() => {
    // Simulating loading the output.json data
    const sampleData: WSIData = {
      "id": 19,
      "patient_id": "7",
      "inference_results": JSON.stringify({
        "output": {
          "detection_results": [
            [121, 4, 163, 45, "Circular_RBC"],
            [396, 312, 433, 353, "Circular_RBC"],
            // ... more results
          ]
        }
      }),
      "celery_status": "completed",
      "filename": "7_20241209_024613.png",
      "sample_type": "blood",
      "date": "2024-12-09"
    };

    // Parse the inference results
    try {
      const inferenceData = JSON.parse(sampleData.inference_results);
      const parsedResults = inferenceData.output.detection_results.map(
        (result: [number, number, number, number, string]): DetectionResult => ({
          bbox: result
        })
      );
      setWsiData({ ...sampleData, parsedResults });
    } catch (error) {
      console.error('Error parsing inference results:', error);
    }
  }, []);

  const wsiImageUrl = "/blood-cells.jpg"; // Using the provided image

  const findings = wsiData 
    ? `Analysis completed on ${wsiData.date} for Patient ${wsiData.patient_id}. This ${wsiData.sample_type} sample shows typical circular red blood cells (RBCs) with normal morphology. The automated detection system has identified and analyzed individual cells for further review.`
    : "Loading analysis results...";

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-72 flex flex-col space-y-4 p-4 bg-white border-r border-gray-200">
        <LeftPanel 
          findings={findings} 
          cellCount={wsiData?.parsedResults?.length || 0} 
        />
        <ImageControls />
        {selectedCell && <CellDetails cell={selectedCell} />}
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex justify-end">
            <HubView imageUrl={wsiImageUrl} />
          </div>
        </div>
        
        <div className="flex-1 p-4">
          {wsiData?.parsedResults && (
            <WSIViewer
              imageUrl={wsiImageUrl}
              detectionResults={wsiData.parsedResults}
              onCellClick={setSelectedCell}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;