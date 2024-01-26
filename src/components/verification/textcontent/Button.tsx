import React, { MouseEventHandler } from 'react'

interface ButtonProps {
  onPredict: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({ onPredict }) => {
  return (
    <div>
      <button
        onClick={onPredict}
        type='button'
        className='bg-custom-black text-white text-center py-2 px-4 rounded text-base'
        value='Demo'
      >
        Demo
      </button>
    </div>
  );
}

export default Button
