import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Education',
      href: '/education',
      icon: BookOpen,
    },
    {
      name: 'Investments',
      href: '/investments',
      icon: TrendingUp,
    },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-white px-4 py-2 shadow-sm">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            SpendWise
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
              <div className="flex flex-col h-full">
                <div className="flex-1 py-4 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`${
                            location.pathname === item.href
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                        >
                          <Icon className="mr-4 h-6 w-6" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50"
                  >
                    <LogOut className="mr-4 h-6 w-6" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              SpendWise
            </Link>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  <Icon className="mr-3 h-6 w-6" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50"
            >
              <LogOut className="mr-3 h-6 w-6" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
