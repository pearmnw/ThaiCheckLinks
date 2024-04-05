import React from "react";

interface ProgressBarLoaderProps {
  progress: number;
}

const ProgressBarLoader: React.FC<ProgressBarLoaderProps> = ({ progress }) => {
  return (
    <div
      style={{
        width: "50%",
        backgroundColor: "#eee",
        height: "30px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          transition: "width 0.5s ease-in-out",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className="h-[30px] animate-pulse rounded-[15px] bg-gradient-to-r from-[#02006D] to-[#144EE3]"
      >
        <span className="text-white absolute inset-0 flex items-center justify-center text-sm font-medium">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBarLoader;
