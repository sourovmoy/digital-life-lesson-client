import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";
import useRole from "../../../hooks/useRole";
import { FiLoader } from "react-icons/fi";
const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const { isPremium } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const links = (
    <>
      <NavLink
        to={"/"}
        className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold"
      >
        Home
      </NavLink>

      <NavLink
        to={"/public-lessons"}
        className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold"
      >
        Public Lessons
      </NavLink>

      <NavLink
        to={"/dashboard/add-lesson"}
        className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold"
      >
        Add Lesson
      </NavLink>
      <NavLink
        to={"/dashboard/my-lesson"}
        className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold"
      >
        My Lessons
      </NavLink>
      {!isPremium ? (
        <NavLink
          to={"/upgrade"}
          className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold"
        >
          upgrade
        </NavLink>
      ) : (
        <div className="badge badge-outline badge-warning">Premium ⭐</div>
      )}

      {!user && (
        <NavLink
          to={"/login"}
          className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold"
        >
          Login
        </NavLink>
      )}
    </>
  );

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <img
                className="h-20 w-20"
                src={logo}
                alt="Digital Life Lessons"
              />
            </Link>
            <div className="hidden md:flex gap-2 items-center">{links}</div>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {loading ? (
                  <FiLoader className="animate-spin" />
                ) : (
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                  >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                      {/* Avatar */}
                      <img
                        className="rounded-full"
                        referrerPolicy="no-referrer"
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt="profile"
                        height="30"
                        width="30"
                      />
                    </div>
                  </div>
                )}
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {loading ? (
                      <FiLoader className="animate-spin" />
                    ) : (
                      user && (
                        <div className="flex items-center justify-between py-3 px-2 border-b-2">
                          <p className="font-semibold text-wrap">
                            {user?.displayName}
                          </p>
                          <img
                            className="rounded-full h-12 w-12 outline-3 outline-orange-300"
                            referrerPolicy="no-referrer"
                            src={
                              user && user.photoURL ? user.photoURL : avatarImg
                            }
                            alt="profile"
                          />
                        </div>
                      )
                    )}
                    <div className="flex flex-col md:hidden ">{links}</div>
                    {user ? (
                      <>
                        <NavLink
                          to="/dashboard/profile"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Profile
                        </NavLink>
                        <NavLink
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Dashboard
                        </NavLink>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </NavLink>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
