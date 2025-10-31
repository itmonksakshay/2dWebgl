import React, { useRef, useState, useEffect, useCallback } from 'react';
import './RotateCircle.css';

interface RotateCircleProps {
  onRotate?: (clipSpace: { x: number; y: number; }) => void;
}

const RotateCircle: React.FC<RotateCircleProps> = ({ onRotate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(Math.PI / 2); // start at top
  const [isDragging, setDragging] = useState(false);

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = useCallback(() => setDragging(false), []);
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const dx = event.clientX - rect.left - centerX;
      const dy = event.clientY - rect.top - centerY;

      const newAngle = -Math.atan2(dy, dx); // clockwise rotation
      setAngle(newAngle);
    },
    [isDragging]
  );

  useEffect(() => {
    onRotate?.({
      x: Math.round(Math.cos(angle) * 1000) / 1000,
      y: Math.round(Math.sin(angle) * 1000) / 1000,
    })
  }, [angle, onRotate])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Calculate circle position
  const getCirclePosition = (angle: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const radius = rect.width / 2;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const dx = Math.cos(angle) * radius
    const dy = Math.sin(angle) * radius

    const rotate = Math.atan2(dx, dy) * (180 / Math.PI);

    return {
      x: centerX + dx,
      y: centerY - dy, // positive Y is downward
      rotate
    };
  };

  // X-axis line from center to circle projection on X
  const getXAxis = (angle: number) => {
    if (!containerRef.current) return { top: 0, left: 0, width: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const radius = rect.width / 2;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const dx = Math.cos(angle) * radius;
    return {
      top: centerY,
      left: centerX,
      width: Math.abs(dx),
      direction: dx >= 0 ? 1 : -1, // right or left
    };
  };

  // Y-axis line from center to circle projection on Y
  const getYAxis = (angle: number) => {
    if (!containerRef.current) return { top: 0, left: 0, height: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const radius = rect.width / 2;
    const centerY = rect.height / 2;

    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;
    return {
      top: centerY,
      left: centerY + dx,
      height: Math.abs(dy),
      direction: dy >= 0 ? -1 : 1, // down or up
    };
  };

  const circlePos = getCirclePosition(angle);
  const xAxis = getXAxis(angle);
  const yAxis = getYAxis(angle);

  return (
    <div className="rotate-container">
      <div className="circle-area" ref={containerRef}>
        {/* X-axis line */}
        <div
          className="xaxis-arrow"
          style={{
            position: 'absolute',
            height: '2px',
            width: `${xAxis.width}px`,
            background: 'red',
            top: `${xAxis.top}px`,
            left: xAxis.direction === 1 ? `${xAxis.left}px` : `${xAxis.left - xAxis.width}px`,
            transformOrigin: '0% 50%',
            transform: `translateY(-50%)`,
          }}
        />

        {/* Y-axis line */}
        <div
          className="yaxis-arrow"
          style={{
            width: '2px',
            height: `${yAxis.height}px`,
            background: 'blue',
            top: yAxis.direction === 1 ? `${yAxis.top}px` : `${yAxis.top - yAxis.height}px`,
            left: `${yAxis.left}px`,
            transformOrigin: '50% 0%',
            transform: `translateX(-50%)`
          }}
        />
        <div
          className="zaxis-arrow"
          style={{
            position: 'absolute',
            width: '2px',
            height: '100px',
            background: 'yellow',
            top: '0px',
            left: '100px',
            transformOrigin: 'bottom center',
            transform: `rotate(${circlePos.rotate}deg)`,
          }}
        />

        {/* Center dot */}
        <div className="center-dot" />

        {/* Draggable small circle */}
        <div
          className="dragging-circle"
          style={{
            left: `${circlePos.x}px`,
            top: `${circlePos.y}px`,
          }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default RotateCircle;
