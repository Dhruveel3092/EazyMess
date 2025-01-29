import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/app_logo.png';
import home from '../assets/home.png';

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Image Section */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <img src={home} alt="Dashboard Preview" className="max-w-full h-auto" />
      </div>
      
      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-[#c5e6fb] flex flex-col justify-center items-center p-10">
        <div className="flex items-center mb-8">
          <img src={Logo} alt="Logo" className="h-16 mr-4" />
          <h1 className="text-3xl font-bold text-black">MESS-WEB-APP</h1>
        </div>
        
        <div className="w-full max-w-xs">
          <input type="text" placeholder="Username" className="w-full p-4 mb-4 border rounded-lg bg-white text-black" />
          <div className="relative w-full">
            <input type="password" placeholder="Password" className="w-full p-4 border rounded-lg bg-white text-black pr-16" />
            <span className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400">|</span>
            <a href="#" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 hover:text-[#0a138b]">Forgot?</a>
          </div>
          <button className="w-full bg-black text-white p-4 rounded-lg hover:bg-[#0a138b] mt-4">LOG IN</button>
          <div className="my-4 flex items-center">
            <hr className="flex-grow border-black" />
            <span className="mx-2 text-black font-semibold">or</span>
            <hr className="flex-grow border-black" />
          </div>
          <button className="w-full bg-black text-white p-4 rounded-lg flex items-center justify-center hover:bg-[#0a138b]">
            <span className="mr-2">G</span> SIGN IN WITH GOOGLE
          </button>
          <p className="mt-4 text-center text-black text-sm">
            DON'T HAVE AN ACCOUNT ? <Link to="/register" className="text-[#0a138b] font-bold">CREATE ONE.</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;