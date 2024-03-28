import React from 'react'

interface ProgressBarLoaderProps {
  progress: number;
}


const ProgressBarLoader: React.FC<ProgressBarLoaderProps> = ({ progress }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#eee', height: '4px' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '4px',
          backgroundColor: 'blue',
        }}
      ></div>
    </div>
  );
}

export default ProgressBarLoader