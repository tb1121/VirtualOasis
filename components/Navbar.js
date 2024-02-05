// components/Navbar.js
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-xl font-bold cursor-pointer">Your Logo</span>
        </Link>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className={`lg:flex lg:items-center ${isMenuOpen ? 'block' : 'hidden'}`}>
          <Link href="/">
            <span className={`text-white cursor-pointer lg:ml-4 lg:inline-block ${isMenuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className={`text-white cursor-pointer lg:ml-4 lg:inline-block ${isMenuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
              About
            </span>
          </Link>
          <Link href="/mindful">
            <span className={`text-white cursor-pointer lg:ml-4 lg:inline-block ${isMenuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
              Mindfulness
            </span>
          </Link>
          {/* Add login link */}
          <Link href="/login">
            <span className={`text-white cursor-pointer lg:ml-4 lg:inline-block ${isMenuOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
              Login
            </span>
          </Link>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800 p-4">
          <Link href="/">
            <span className="text-white cursor-pointer block mb-2" onClick={toggleMenu}>
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="text-white cursor-pointer block mb-2" onClick={toggleMenu}>
              About
            </span>
          </Link>
          <Link href="/mindful">
            <span className="text-white cursor-pointer block mb-2" onClick={toggleMenu}>
              Mindfulness
            </span>
          </Link>
          {/* Add login link */}
          <Link href="/login">
            <span className="text-white cursor-pointer block" onClick={toggleMenu}>
              Login
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
