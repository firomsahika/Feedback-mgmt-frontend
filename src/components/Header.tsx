import React from 'react';

const Header = () => {
  return (
    <header className="z-10 flex items-center w-full justify-between px-6 h-[4rem] bg-[E6E6E6] text-slate-800 shadow-md">
      {/* Logo */}
      <div className="text-lg font-bold">Student Feedback</div>

      {/* Navigation Links */}
      <nav className="flex space-x-6">
        <a href="#" className="hover:text-gray-400">Home</a>
        <a href="#" className="hover:text-gray-400">About</a>
        <a href="#" className="hover:text-gray-400">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
    