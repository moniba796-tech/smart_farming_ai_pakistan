import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sprout, Languages, User, LogOut, LayoutDashboard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const NAV_LINKS = [
    { to: "/disease-detection", label: t.nav.disease, emoji: "🌱" },
    { to: "/crop-advisor", label: t.nav.crop, emoji: "🌾" },
    { to: "/weed-management", label: t.nav.weeds, emoji: "🌿" },
    { to: "/marketplace", label: t.nav.marketplace, emoji: "🛒" },
    { to: "/assistant", label: t.nav.assistant, emoji: "🤖" },
  ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-farm-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0" onClick={() => setOpen(false)}>
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-farm-500 to-farm-700 flex items-center justify-center shadow-card"
          >
            <Sprout className="w-6 h-6 text-white" />
          </motion.div>
          <span className="font-extrabold text-lg text-farm-700 group-hover:text-farm-600 transition-colors hidden sm:inline">
            Smart Farming AI <span className="text-wheat-600">Pakistan</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-farm-500 text-white shadow-card"
                    : "text-gray-600 hover:bg-farm-50 hover:text-farm-700"
                }`
              }
            >
              <span className="mr-1">{link.emoji}</span>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Language toggle — visible on all screen sizes */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-farm-50 text-farm-700 text-sm font-semibold border border-farm-100 hover:bg-farm-100 transition-colors"
            aria-label="Toggle language / زبان تبدیل کریں"
          >
            <Languages className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === "en" ? "اردو" : "English"}</span>
          </motion.button>

          {/* Auth: Dashboard/Logout if logged in, Login link otherwise */}
          {user ? (
            <div className="hidden md:flex items-center gap-1.5">
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-farm-600 text-white text-sm font-semibold hover:bg-farm-700 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                {user.role === "admin" ? "Admin" : "Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                aria-label="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-farm-600 text-white text-sm font-semibold hover:bg-farm-700 transition-colors"
            >
              <User className="w-4 h-4" />
              Log In
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-farm-50 text-farm-700"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-farm-100 bg-white"
          >
            <div className="flex flex-col p-3 gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive ? "bg-farm-500 text-white" : "text-gray-600 hover:bg-farm-50"
                    }`
                  }
                >
                  <span className="mr-2">{link.emoji}</span>
                  {link.label}
                </NavLink>
              ))}

              <div className="border-t border-farm-100 my-1 pt-1">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-farm-500 text-white"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {user.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-600 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-farm-500 text-white"
                  >
                    <User className="w-4 h-4" />
                    Log In / Sign Up
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
