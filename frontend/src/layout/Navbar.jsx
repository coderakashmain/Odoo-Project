import React, { memo, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth/Auth";
import {
  Home,
  User,
  Info,
  Mail,
  Bell,
  Menu,
  X,
  Search,
  Settings,
  LogOut,
} from "lucide-react";

function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleNotifications = () => setShowNotification(!showNotification);
  const toggleProfile = () => setShowProfile(!showProfile);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowProfile(false);
    setIsOpen(false);
  };

  const navItems = [
    { path: "/", name: "Home", icon: <Home size={20} />, authRequired: false },
    {
      path: "/about",
      name: "About",
      icon: <Info size={20} />,
      authRequired: false,
    },
    {
      path: "/contact",
      name: "Contact",
      icon: <Mail size={20} />,
      authRequired: false,
    },
  ];

  const notifications = [
    { id: 1, text: "New message from John", time: "2 min ago" },
    { id: 2, text: "Your order has shipped", time: "1 hour ago" },
    { id: 3, text: "New feature available", time: "3 days ago" },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.authRequired || (item.authRequired && auth.isLoggedIn)
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav items (left side) */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">Logo</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {filteredNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`
                  }
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side items (search, notifications, profile) */}
          <div className="flex items-center">
            {/* Search - Only show when logged in */}
            {auth.isLoggedIn && (
              <div className="hidden md:flex relative mx-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}

            {/* Notifications - Only show when logged in */}
            {auth.isLoggedIn && (
              <div className="ml-4 relative">
                <button
                  onClick={toggleNotifications}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Bell size={20} />
                  <span className="sr-only">View notifications</span>
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  )}
                </button>

                {/* Notification dropdown */}
                {showNotification && (
                  <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b">
                        Notifications
                      </div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="px-4 py-3 hover:bg-gray-50"
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {notification.text}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                      <div className="px-4 py-2 text-center border-t">
                        <button className="text-sm text-indigo-600 hover:text-indigo-900">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile dropdown or Login button */}
            {auth.isLoggedIn ? (
              <div className="ml-4 relative">
                <button
                  onClick={toggleProfile}
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                </button>

                {showProfile && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <NavLink
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfile(false)}
                      >
                        <User size={16} className="mr-2" />
                        Your Profile
                      </NavLink>
                      <NavLink
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfile(false)}
                      >
                        <Settings size={16} className="mr-2" />
                        Settings
                      </NavLink>
                      <div className="border-t border-gray-200"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:block">
                <NavLink
                  to="/login"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </NavLink>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </div>
              </NavLink>
            ))}
          </div>
          {auth.isLoggedIn ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    <User size={16} />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {auth.user?.name || "User"}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {auth.user?.email || "user@example.com"}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <User size={16} className="mr-2" />
                    Your Profile
                  </div>
                </NavLink>
                <NavLink
                  to="/settings"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </div>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 px-4">
              <NavLink
                to="/login"
                className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default memo(Navbar);
