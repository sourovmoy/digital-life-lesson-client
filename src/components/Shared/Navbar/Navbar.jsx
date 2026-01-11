import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";
import useRole from "../../../hooks/useRole";
import { FiLoader } from "react-icons/fi";
import LoadingSpinner from "../LoadingSpinner";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const { isPremium, role, roleLoading } = useRole();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const mobileDropdownRef = useRef(null);
  const desktopDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Debug user object
  useEffect(() => {
    if (user) {
      console.log("Navbar user object:", {
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email
      });
    }
  }, [user]);

  // Handle logout with navigation
  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Logout clicked"); // Debug log
    console.log("logOut function:", typeof logOut); // Debug log
    
    if (!logOut) {
      console.error("logOut function not available");
      toast.error("Logout function not available");
      return;
    }

    try {
      console.log("Attempting logout..."); // Debug log
      await logOut();
      setIsMobileOpen(false);
      setIsDesktopOpen(false);
      navigate("/");
      toast.success("Logged out successfully!");
      console.log("Logout successful"); // Debug log
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(`Failed to logout: ${error.message}`);
      setIsMobileOpen(false);
      setIsDesktopOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setIsMobileOpen(false);
      }
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setIsDesktopOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (roleLoading) return <LoadingSpinner />;

  // Desktop navigation links
  const desktopLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => 
          `px-3 py-2 rounded-md hover:bg-secondary/20 hover:text-primary transition font-semibold ${
            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/public-lessons"
        className={({ isActive }) => 
          `px-3 py-2 rounded-md hover:bg-secondary/20 hover:text-primary transition font-semibold ${
            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
          }`
        }
      >
        Lessons
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => 
          `px-3 py-2 rounded-md hover:bg-secondary/20 hover:text-primary transition font-semibold ${
            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
          }`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/contact"
        className={({ isActive }) => 
          `px-3 py-2 rounded-md hover:bg-secondary/20 hover:text-primary transition font-semibold ${
            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
          }`
        }
      >
        Contact
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/dashboard/add-lesson"
            className={({ isActive }) => 
              `px-3 py-2 rounded-md hover:bg-secondary/20 hover:text-primary transition font-semibold ${
                isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
              }`
            }
          >
            Add Lesson
          </NavLink>

          <NavLink
            to="/dashboard/my-lesson"
            className={({ isActive }) => 
              `px-3 py-2 rounded-md hover:bg-secondary/20 hover:text-primary transition font-semibold ${
                isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
              }`
            }
          >
            My Lessons
          </NavLink>
        </>
      )}

      {user && !isPremium && (
        <NavLink
          to="/upgrade"
          className={({ isActive }) => 
            `px-3 py-2 rounded-md hover:bg-secondary/20 hover:text-primary transition font-semibold ${
              isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
            }`
          }
        >
          Upgrade
        </NavLink>
      )}

      {user && isPremium && (
        <div className="badge bg-secondary text-secondary-content border-secondary ml-2">Premium ⭐</div>
      )}

      {!user && (
        <NavLink
          to="/login"
          className={({ isActive }) => 
            `px-3 py-2 rounded-md hover:bg-secondary/20 hover:text-primary transition font-semibold ${
              isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
            }`
          }
        >
          Login
        </NavLink>
      )}
    </>
  );

  // Mobile navigation links
  const mobileLinks = (
    <>
      <NavLink
        to="/"
        onClick={() => setIsMobileOpen(false)}
        className={({ isActive }) => 
          `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
          }`
        }
      >
        🏠 Home
      </NavLink>

      <NavLink
        to="/public-lessons"
        onClick={() => setIsMobileOpen(false)}
        className={({ isActive }) => 
          `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
          }`
        }
      >
        📚 Lessons
      </NavLink>

      <NavLink
        to="/about"
        onClick={() => setIsMobileOpen(false)}
        className={({ isActive }) => 
          `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
          }`
        }
      >
        ℹ️ About
      </NavLink>

      <NavLink
        to="/contact"
        onClick={() => setIsMobileOpen(false)}
        className={({ isActive }) => 
          `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
          }`
        }
      >
        📞 Contact
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/dashboard/add-lesson"
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) => 
              `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
                isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
              }`
            }
          >
            ➕ Add Lesson
          </NavLink>

          <NavLink
            to="/dashboard/my-lesson"
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) => 
              `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
                isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
              }`
            }
          >
            📖 My Lessons
          </NavLink>
        </>
      )}

      {user && !isPremium && (
        <NavLink
          to="/upgrade"
          onClick={() => setIsMobileOpen(false)}
          className={({ isActive }) => 
            `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
              isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
            }`
          }
        >
          ⭐ Upgrade
        </NavLink>
      )}

      {user && isPremium && (
        <div className="px-4 py-3 border-b border-base-300/50">
          <div className="badge bg-secondary text-secondary-content border-secondary">Premium ⭐</div>
        </div>
      )}

      {!user && (
        <NavLink
          to="/login"
          onClick={() => setIsMobileOpen(false)}
          className={({ isActive }) => 
            `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
              isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
            }`
          }
        >
          🔐 Login
        </NavLink>
      )}
    </>
  );

  return (
    <motion.div 
      className="fixed w-full bg-base-100 z-20 shadow-sm text-base-content border-b border-base-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container>
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <img className="h-20 w-20" src={logo} alt="Digital Life Lessons" />
            </Link>
          </motion.div>

          {/* Desktop menu */}
          <motion.div 
            className="hidden md:flex gap-4 items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {desktopLinks}
            {/* Desktop Theme Toggle */}
            <ThemeToggle size="normal" className="ml-2" />
          </motion.div>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Theme Toggle - Always Visible */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ThemeToggle size="small" />
            </motion.div>
            
            {/* Mobile Menu Button */}
            <div className="relative" ref={mobileDropdownRef}>
              <div className="flex items-center gap-3">
                {loading ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <motion.div
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="p-3 border border-base-300 bg-base-200 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md hover:bg-secondary/20 transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={{ rotate: isMobileOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AiOutlineMenu className="text-lg" />
                    </motion.div>
                    {user && (
                      <motion.img
                        className="rounded-full w-6 h-6 object-cover border border-primary/20"
                        referrerPolicy="no-referrer"
                        src={user?.photoURL || avatarImg}
                        alt="profile"
                        onError={(e) => {
                          console.log("Profile image failed to load, using fallback");
                          e.target.src = avatarImg;
                        }}
                        whileHover={{ scale: 1.1 }}
                      />
                    )}
                  </motion.div>
                )}
              </div>

              {/* Mobile Dropdown */}
              <AnimatePresence>
                {isMobileOpen && (
                  <motion.div 
                    className="absolute right-0 top-14 w-[300px] bg-base-100 rounded-xl shadow-xl overflow-hidden text-sm border border-base-300 z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col">
                      {user && (
                        <motion.div 
                          className="flex items-center gap-3 py-4 px-4 border-b border-base-300 bg-base-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <img
                            className="rounded-full h-12 w-12 border-2 border-primary/20 object-cover"
                            referrerPolicy="no-referrer"
                            src={user.photoURL || avatarImg}
                            alt="profile"
                            onError={(e) => {
                              console.log("Mobile profile image failed to load, using fallback");
                              e.target.src = avatarImg;
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-base-content truncate">{user.displayName}</p>
                            <p className="text-xs text-base-content/70 truncate">{user.email}</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Mobile Navigation Links */}
                      <motion.div 
                        className="py-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {mobileLinks}
                      </motion.div>

                      {/* User Actions */}
                      {user ? (
                        <motion.div 
                          className="border-t border-base-300 bg-base-200"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <NavLink
                            to="/dashboard/profile"
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) => 
                              `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
                                isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
                              }`
                            }
                          >
                            👤 Profile
                          </NavLink>

                          <NavLink
                            to={role === "admin" ? "/dashboard/admin" : "/dashboard"}
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) => 
                              `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold border-b border-base-300/50 ${
                                isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
                              }`
                            }
                          >
                            📊 Dashboard
                          </NavLink>

                          <motion.div
                            onClick={handleLogout}
                            className="block px-4 py-3 hover:bg-error/20 hover:text-error transition font-semibold cursor-pointer"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            🚪 Logout
                          </motion.div>
                        </motion.div>
                      ) : (
                        <div className="border-t border-base-300 bg-base-200">
                          <NavLink
                            to="/signup"
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) => 
                              `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold ${
                                isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
                              }`
                            }
                          >
                            ✨ Sign Up
                          </NavLink>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:block relative" ref={desktopDropdownRef}>
            <div className="flex items-center gap-3">
              {loading ? (
                <FiLoader className="animate-spin" />
              ) : user ? (
                <motion.div
                  onClick={() => setIsDesktopOpen(!isDesktopOpen)}
                  className="p-2 border border-base-300 bg-base-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md hover:bg-secondary/20 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img
                    className="rounded-full w-8 h-8 object-cover border border-primary/20"
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || avatarImg}
                    alt="profile"
                    onError={(e) => {
                      console.log("Desktop profile image failed to load, using fallback");
                      e.target.src = avatarImg;
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.div
                    animate={{ rotate: isDesktopOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AiOutlineMenu className="text-sm" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-base-content hover:text-primary transition font-medium"
                    >
                      Login
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/signup"
                      className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-secondary transition font-medium"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Desktop User Dropdown */}
            <AnimatePresence>
              {isDesktopOpen && user && (
                <motion.div 
                  className="absolute right-0 top-12 w-48 bg-base-100 rounded-xl shadow-xl overflow-hidden text-sm border border-base-300 z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col">
                    <div className="py-3 px-4 border-b border-base-300 bg-base-200">
                      <p className="font-semibold text-base-content truncate">{user.displayName}</p>
                      <p className="text-xs text-base-content/70 truncate">{user.email}</p>
                    </div>

                    <motion.div whileHover={{ x: 5 }}>
                      <NavLink
                        to="/dashboard/profile"
                        onClick={() => setIsDesktopOpen(false)}
                        className={({ isActive }) => 
                          `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold ${
                            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
                          }`
                        }
                      >
                        👤 Profile
                      </NavLink>
                    </motion.div>

                    <motion.div whileHover={{ x: 5 }}>
                      <NavLink
                        to={role === "admin" ? "/dashboard/admin" : "/dashboard"}
                        onClick={() => setIsDesktopOpen(false)}
                        className={({ isActive }) => 
                          `block px-4 py-3 hover:bg-secondary/20 hover:text-primary transition font-semibold ${
                            isActive ? 'text-primary bg-secondary/10' : 'text-base-content'
                          }`
                        }
                      >
                        📊 Dashboard
                      </NavLink>
                    </motion.div>

                    <motion.div
                      onClick={handleLogout}
                      className="block px-4 py-3 hover:bg-error/20 hover:text-error transition font-semibold cursor-pointer border-t border-base-300"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🚪 Logout
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default Navbar;
