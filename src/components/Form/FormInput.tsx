// src/components/FormInput.tsx
import React from 'react'

interface FormInputProps {
  label: string
  type?: string
  required?: boolean
}

const FormInput: React.FC<FormInputProps> = ({ label, type = 'text', required = false }) => (
  <div className="flex flex-col mb-4">
    <label className="font-medium mb-1 text-black">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-500"
      required={required}
    />
  </div>
)

export default FormInput
