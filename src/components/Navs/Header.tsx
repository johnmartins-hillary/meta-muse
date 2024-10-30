import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const Header: React.FC = () => {
  // State to control dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-black text-white  top-0">
      <div className="flex items-center space-x-4">
       <Link href='/'> <img src="/asset/logo.svg" alt="logo" className="h-[50px]" /></Link>
        <Link href='/ongoing-projects' className=" flex items-center px-6 py-1 text-center outline-none rounded-[50px] border-[3px] border-[#D42C2CB2] h-[50px]">
          Studio
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex bg-none border-[1px] border-[#D42C2CB2] items-center px-4 rounded-full">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-1 bg-gray-800 rounded text-white bg-transparent border-none outline-none"
          />
          <Search className="text-white" />
        </div>
        
        {/* Menu Icon */}
        <div onClick={toggleDropdown} className="relative">
          <Menu className="text-white cursor-pointer" />

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div className="flex flex-col absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg p-4 z-50">
              <Link  href="/auth/sign-up" className="w-full py-2 text-center border border-[#D42C2CB2] rounded-full mb-2 text-[#D42C2CB2]">
                Sign-up
              </Link>
              <Link href="/auth/sign-in" className="w-full py-2 text-center border border-[#D42C2CB2] rounded-full text-[#D42C2CB2]">
                Log-in
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
