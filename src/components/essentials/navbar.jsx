'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

const navItems = [
  { id: 1, name: 'Home', path: '/' },
  { id: 2, name: 'About Us', path: '/about' },
  {
    id: 3,
    name: 'Our Works',
    path: '#',
    submenu: [
      { name: 'Water Well', path: '/projects/ongoing' },
      { name: 'Ablution Centers', path: '/projects/completed' },
      { name: 'Building Mosque', path: '/projects/ongoing' },
      { name: 'Orphan Sponsoring', path: '/projects/completed' },
      { name: 'Food Pack Distribution', path: '/projects/ongoing' },
      { name: 'Qurbani Project', path: '/projects/completed' },
      { name: 'Zakaat Project', path: '/projects/ongoing' },
      { name: 'Education Sponsoring', path: '/projects/completed' },
      { name: 'Building Orphan Housing', path: '/projects/ongoing' },
      { name: 'Building Madrasah', path: '/projects/completed' },
    ],
  },
  { id: 4, name: 'Our Stories', path: '/news' },
  { id: 5, name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 bg-white transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo/light-logo.png" width={120} height={90} className='' alt='Aid For Humanity' />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <div className="flex items-center text-gray-700 hover:text-indigo-600 font-medium text-sm cursor-pointer">
                  <Link href={item.path} className="flex items-center">
                    {item.name}
                    {item.submenu && <ChevronDown className="w-4 h-4 ml-1" />}
                  </Link>
                </div>

                {item.submenu && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-10">
                    {item.submenu.map((sub, index) => (
                      <Link
                        key={index}
                        href={sub.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 text-sm"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/projects"
              className="ml-4 bg-primary hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-md font-medium"
            >
              Projects
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="max-w-screen-xl mx-auto px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex justify-between items-center text-gray-700 hover:text-indigo-600 font-medium text-base">
                <Link
                  href={item.path}
                  onClick={() => {
                    if (!item.submenu) setMobileOpen(false);
                  }}
                  className="block w-full"
                >
                  {item.name}
                </Link>

                {item.submenu && (
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent link navigation
                      toggleDropdown(item.id);
                    }}
                    className="ml-2"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transform transition-transform ${
                        openDropdownId === item.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.submenu && openDropdownId === item.id && (
                <div className="ml-4 space-y-1">
                  {item.submenu.map((sub, index) => (
                    <Link
                      key={index}
                      href={sub.path}
                      onClick={() => setMobileOpen(false)}
                      className="block text-gray-600 hover:text-indigo-600 text-sm"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
            <Link
              href="/projects"
              onClick={() => setMobileOpen(false)}
              className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-base font-medium text-center"
            >
              Projects
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
