// src/components/SignUpForm.tsx
import React from 'react'
import FormInput from './FormInput'
import Button from './Button'
import TextArea from './TextArea'

interface CreateCanvsModalProp{
    handleCloseModal: any
}
const CreateCanvasModal: React.FC<CreateCanvsModalProp> = ({handleCloseModal}) => (
    <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-md bg-white/10 flex flex-col items-center justify-center' id="parent" onClick={handleCloseModal}>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Create Canvas</h2>
            <form className="space-y-4">
                <FormInput label="Canvas Code" type="email" required />
                <FormInput label="NFT Name" type="password" required />
                <TextArea label="NFT Description"  required />
                <Button label="Proceed" type="submit" className="w-full mt-4 bg-[#D42C2CB2]" />
            </form> 
            </div>
    </div>
)

export default CreateCanvasModal
