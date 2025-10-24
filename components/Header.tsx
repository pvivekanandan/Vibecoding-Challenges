import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        Pradeep's Todo List
      </h1>
      <p className="mt-2 text-lg text-slate-400">Stay organized, one task at a time.</p>
    </header>
  );
};

export default Header;