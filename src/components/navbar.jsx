import React from 'react';
import './Navbar.css'; // Import CSS file for Navbar styling

const Navbar = () => {
  return (
    <nav className="bg-purple-200">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-4xl">Password Manager</div>
        <button className='text-white bg-yellow-80 display-flex gap-4'>
          Github 
          <img className='github-logo' src='/icons/GitHub-logo.png' alt='github logo'/>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;



