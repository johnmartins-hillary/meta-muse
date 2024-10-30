// src/components/LoginForm.tsx
import React from 'react'
import FormInput from './FormInput'
import Button from './Button'
import Header from '../Navs/Header'

const LoginForm: React.FC = () => (
    <div className='relative auth-bg'>
        <Header />
        <div className="flex items-center justify-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                Log in to your Account<span className="text-red-500">!</span>
            </h2>
            <form className="space-y-4">
                <FormInput label="Email address" type="email" required />
                <FormInput label="Password" type="password" required />
                <div className="flex justify-between text-sm mb-4">
                {/* <a href="#" className="text-blue-500 hover:underline">Forgot password?</a> */}
                </div>
                <Button label="Log in" type="submit" className="w-full bg-[#D42C2CB2]" />
            </form>
            {/* <div className="text-center mt-4 text-sm">
                <span>A new user? </span>
                <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
            </div> */}
            </div>
        </div>
    </div>
)

export default LoginForm
