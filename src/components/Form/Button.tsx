// src/components/Button.tsx
import React from 'react'

interface ButtonProps {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'button', className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    className={` text-white py-2 px-4 rounded ${className}  focus:outline-none`}
  >
    {label}
  </button>
)

export default Button
