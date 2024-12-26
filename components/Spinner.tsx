import React from "react";

interface SpinnerProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  width,
  height,
  color,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={width}
      height={height}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray="125.6"
        strokeDashoffset="100"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.8s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="100;125.6"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};