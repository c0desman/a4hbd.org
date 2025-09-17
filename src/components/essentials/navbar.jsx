'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation'; // For current route

/**
 * ===========================
 * Navigation Items Config
 * ===========================
 */
const navItems = [
  { id: 1, name: 'Home', path: '/' },
  { 
    id: 2, 
    name: 'Corporate', 
    path: '#',
    submenu: [
      { name: 'About Us', path: '/about' },
      { name: 'Message of Chariman', path: '/about/chairman-message' },
      // { name: 'Message of Advisor', path: '/about/advisor-message' },
      { name: 'How We Work', path: '/about/how-we-work' },
      // { name: 'Our Partners', path: '/about/partners' },
    ],
  },
  {
    id: 3,
    name: 'Our Initiatives',
    path: '#',
    submenu: [
      { name: 'Education Support', path: '/initiative/2' },
      // { name: 'Emergency Aid', path: '/initiative/3' },
      { name: 'Healthcare Project', path: '/initiative/4' },
      { name: 'Orphan Sponsoring', path: '/initiative/5' },
      { name: 'Water and Sanitation Project', path: '/initiative/6' },
      { name: 'Rohingya Response', path: '/initiative/7' },
      // { name: 'Climate Actions', path: '/initiative/8' },
      // { name: 'Youth Development', path: '/initiative/9' },
      { name: 'Religious and Welfare Initiatives', path: '/initiative/11' },
      { name: 'Infrastructural Development', path: '/initiative/10' },
    ],
  },
  { id: 4, name: 'Updates & Stories', path: '/stories' },
  { id: 5, name: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const pathname = usePathname(); // Get current page route

  // Add shadow when page is scrolled
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Helper: check if current page is active
  const isActive = (path) => pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white transition-shadow ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Left: Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/light-logo.png"
              width={120}
              height={90}
              className=""
              alt="Aid For Humanity"
            />
          </Link>

          {/* Center: Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center flex-1 justify-center">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  href={item.path}
                  className={`flex items-center text-sm font-medium px-2 py-1 rounded-md transition
                    ${
                      isActive(item.path)
                        ? 'text-[#0fa5db] hover:text-gray-700'
                        : 'text-gray-700 hover:text-[#0fa5db]'
                    }`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="w-4 h-4 ml-1" />}
                </Link>

                {/* Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-10 whitespace-nowrap">
                    {item.submenu.map((sub, index) => (
                      <Link
                        key={index}
                        href={sub.path}
                        className={`block border-b border-gray-200/100 px-4 py-2 text-sm transition
                          ${
                            isActive(sub.path)
                              ? 'gradient-button text-white'
                              : 'text-gray-700 hover:bg-[#e0f7ff] hover:text-[#0fa5db]'
                          }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: Projects Button */}
          <div className="hidden md:flex">
            <Link
              href="/projects"
              className="gradient-button text-sm px-5 py-2 rounded-md font-semibold"
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
                <div className="flex justify-between items-center font-medium text-base">
                  <Link
                    href={item.path}
                    onClick={() => {
                      if (!item.submenu) setMobileOpen(false);
                    }}
                    className={`block w-full border-b border-gray-200/100 px-2 py-1 rounded-md
                      ${
                        isActive(item.path)
                          ? 'gradient-button text-white'
                          : 'text-gray-700 hover:text-[#0fa5db]'
                      }`}
                  >
                    {item.name}
                  </Link>

                  {item.submenu && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
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
                        className={`block text-sm border-b border-gray-200/100 px-2 py-1 rounded-md
                          ${
                            isActive(sub.path)
                              ? 'gradient-button text-white'
                              : 'text-gray-600 hover:text-[#0fa5db]'
                          }`}
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
              className="block text-white gradient-button px-4 py-2 rounded-md text-base font-medium text-center"
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
