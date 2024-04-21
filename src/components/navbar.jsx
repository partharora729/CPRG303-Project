import React from 'react';
import './navabar.css';

const Navbar = () => {
  return (
    <nav className="bg-purple-200">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-4xl">Password Manager</div>
        <a href="https://github.com/partharora729/Project-CPRG303.git" target="_blank" rel="noopener noreferrer" className='text-white bg-yellow-80 flex items-center gap-4 px-4 py-2 rounded-full'>
        Github 
        <img className='github-logo h-6 w-6' src='/icons/GitHub-logo.png' alt='github logo'/>
        </a>

      </div>
    </nav>
  );
}
export default Navbar;



