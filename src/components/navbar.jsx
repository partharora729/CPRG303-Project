import React from 'react';
import './navabar.css';
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  return (
<nav className="bg-blue-900">
  <div className="container mx-auto flex justify-between items-center px-4 py-2">
    <div className="text-3xl font-bold text-black mr-auto font-serif">
      <span className="text-white">PASSWORD</span> SAFE
    </div>
    <a href="https://github.com/partharora729/Project-CPRG303.git" target="_blank" rel="noopener noreferrer">
      <img className='github-logo h-10 w-16' src='/icons/GitHub-logo.png' alt='github logo'/>
    </a>
  </div>
</nav>






  );
  
}
export default Navbar;



