import React, { useState, useEffect } from "react";

interface ZoomControlProps {
    min?: number;       // minimum zoom percentage
    max?: number;       // maximum zoom percentage
    step?: number;      // increment step
    defaultZoom?: number;
    onZoom?: (zoomPercent: number) => void;
}

const ZoomControl: React.FC<ZoomControlProps> = ({
    min = 25,
    max = 500,
    step = 10,
    defaultZoom = 100,
    onZoom,
}) => {
    const [zoom, setZoom] = useState(defaultZoom);

    // Notify parent of zoom changes
    useEffect(() => {
        onZoom?.(zoom);
    }, [zoom, onZoom]);

    const handleZoomIn = () => setZoom((z) => Math.min(z + step, max));
    const handleZoomOut = () => setZoom((z) => Math.max(z - step, min));
    const handleReset = () => setZoom(defaultZoom);

    return (
        <div className="flex items-center gap-2 bg-white border rounded-lg px-2 py-1 shadow-sm select-none">
            <button
                onClick={handleZoomOut}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700"
            >
                −
            </button>

            <input
                type="text"
                value={`${zoom}%`}
                readOnly
                className="w-16 text-center border-none bg-transparent text-gray-800 font-medium"
            />

            <button
                onClick={handleZoomIn}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700"
            >
                +
            </button>

            <button
                onClick={handleReset}
                className="px-2 py-1 rounded hover:bg-gray-200 text-gray-700 text-sm"
            >
                Reset
            </button>
        </div>
    );
};

export default ZoomControl;
