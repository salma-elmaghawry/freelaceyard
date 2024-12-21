import React, { useState } from 'react';
import { ZoomIn, ZoomOut, X } from 'lucide-react';
import { Card } from '@/components/ui/card';

const MapExplorer = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  // Sample points of interest data
  const pointsOfInterest = [
    { id: 1, x: 20, y: 30, title: "Central Park", description: "A beautiful urban park with various attractions" },
    { id: 2, x: 60, y: 40, title: "City Museum", description: "Historical artifacts and cultural exhibitions" },
    { id: 3, x: 40, y: 70, title: "Harbor View", description: "Scenic waterfront location with restaurants" }
  ];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 font-helvetica">MapExplorer</h1>
      
      {/* Map Container */}
      <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
        {/* Map Content */}
        <div 
          className="absolute inset-0"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
        >
          {pointsOfInterest.map((poi) => (
            <button
              key={poi.id}
              className="absolute w-6 h-6 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
              onClick={() => handleMarkerClick(poi)}
            />
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <ZoomIn className="w-6 h-6" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <ZoomOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Information Panel */}
      {selectedMarker && (
        <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 p-4 bg-white shadow-xl md:w-96">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold">{selectedMarker.title}</h2>
            <button
              onClick={() => setSelectedMarker(null)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600">{selectedMarker.description}</p>
          <button
            className="mt-4 w-full py-2 px-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            onClick={() => window.alert('More information coming soon!')}
          >
            More Info
          </button>
        </Card>
      )}
    </div>
  );
};

export default MapExplorer;