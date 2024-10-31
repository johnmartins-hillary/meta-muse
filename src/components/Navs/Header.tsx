import React, { useState, useEffect } from 'react';
import { Search, Menu } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useAddress, useMetamask, useNetworkMismatch, useNetwork } from '@thirdweb-dev/react';
import { ChainId } from '@thirdweb-dev/sdk';
import { useDispatch } from 'react-redux';
import { setConnectedWallet } from '@/redux/slice/user-slice';
import Button from '../Form/Button';

const Header: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch()
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
  useEffect(() => {
    const connectWalletOnRender = async () => {
      if (!address) {
        await connectWithMetamask();
      }
      if (isMismatched && switchNetwork) {
        alert('Switching to the Arbitrum network...');
        switchNetwork(ChainId.Arbitrum);
      }
    };

    connectWalletOnRender();
  }, [address, isMismatched, connectWithMetamask, switchNetwork]);

  const formattedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  useEffect(() => {
    if(address) dispatch(setConnectedWallet(address))
  },[address, currentUser])

  return (
    <header className="flex items-center justify-between p-4 bg-black text-white top-0">
      <div className="flex items-center space-x-4">
        <Link href="/"><img src="/asset/logo.svg" alt="logo" className="h-[50px]" /></Link>
        <Link href="/ongoing-projects" className="flex items-center px-6 py-1 text-center outline-none rounded-[50px] border-[3px] border-[#D42C2CB2] h-[50px]">
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

        {/* Display wallet address or connect button */}
        {address ? (
          <span className="ml-4">{formattedAddress}</span>
        ) : (
          <button onClick={() => connectWithMetamask()} className="ml-4 text-[#D42C2CB2] border border-[#D42C2CB2] px-4 py-2 rounded-full">
            Connect Wallet
          </button>
        )}

        {/* Dropdown Menu */}
       {!currentUser?.validUser ? <div onClick={toggleDropdown} className="relative">
          <Menu className="text-white cursor-pointer" />
          {dropdownVisible && (
            <div className="flex flex-col absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg p-4 z-50">
              <Link href="/auth/sign-up" className="w-full py-2 text-center border border-[#D42C2CB2] rounded-full mb-2 text-[#D42C2CB2]">
                Sign-up
              </Link>
              <Link href="/auth/sign-in" className="w-full py-2 text-center border border-[#D42C2CB2] rounded-full text-[#D42C2CB2]">
                Log-in
              </Link>
            </div>
          )}
        </div> : 
          <Button label='Logout' className='w-[100px] bg-[#D42C2CB2] text-white' onClick={() => { localStorage.clear();  window.location.reload()}}/>
        }
      </div>
    </header>
  );
};

export default Header;
