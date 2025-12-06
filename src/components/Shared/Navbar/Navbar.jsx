import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo.png";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const links = (
    <>
      <NavLink className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold">
        Home
      </NavLink>
      <NavLink className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold">
        Add Lesson
      </NavLink>
      <NavLink className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold">
        My Lessons
      </NavLink>
      <NavLink className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold">
        Public Lessons
      </NavLink>
      <NavLink className="md:px-2 px-4 py-3 md:py-0 hover:bg-neutral-100 transition font-semibold">
        upgrade
      </NavLink>
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
                className="h-15 w-15"
                src={logo}
                alt="Digital Life Lessons"
              />
            </Link>
            <div className="hidden md:flex gap-2 items-center">{links}</div>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
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
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    {user && (
                      <div className="flex items-center justify-between py-3 px-2 border-b-2">
                        <p className="font-medium text-wrap">
                          {user?.displayName}
                        </p>
                        <img
                          className="rounded-full h-10 w-10 outline-3 outline-orange-300 mt-3 mr-3"
                          referrerPolicy="no-referrer"
                          src={
                            user && user.photoURL ? user.photoURL : avatarImg
                          }
                          alt="profile"
                        />
                      </div>
                    )}
                    <div className="flex flex-col md:hidden ">{links}</div>
                    {user ? (
                      <>
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
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </NavLink>
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
