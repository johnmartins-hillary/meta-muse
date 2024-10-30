// src/components/SignUpForm.tsx
import React from 'react'
import FormInput from './FormInput'
import Button from './Button'
import Header from '../Navs/Header'

const SignUpForm: React.FC = () => (
    <div className='relative auth-bg'>
        <Header />
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Sign up</h2>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                <FormInput label="First Name" required />
                <FormInput label="Last Name" required />
                </div>
                <FormInput label="Email address" type="email" required />
                <FormInput label="Password" type="password" required />
                <FormInput label="Wallet Address" type="text" required />
                <Button label="Sign Up" type="submit" className="w-full mt-4 bg-[#D42C2CB2]" />
            </form>
            {/* <div className="text-center mt-4">
                <button className="flex items-center justify-center gap-2 p-2 border border-gray-300 rounded hover:bg-gray-100 w-full">
                    <img src="/asset/google-sign.svg" alt="Google Logo" className="" />
                    <span>Sign up with Google</span>
                </button>
            </div> */}
            </div>
            </div>
    </div>
)

export default SignUpForm
