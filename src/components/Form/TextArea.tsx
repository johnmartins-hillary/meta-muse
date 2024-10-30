// src/components/TextArea.tsx
import React from 'react'

interface TextAreaProps {
  label: string
  required?: boolean
}

const TextArea: React.FC<TextAreaProps> = ({ label, required = false }) => (
  <div className="flex flex-col mb-4">
    <label className="font-medium mb-1 text-black">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-500 resize-none min-h-16"
      required={required}
    />
  </div>
)

export default TextArea
