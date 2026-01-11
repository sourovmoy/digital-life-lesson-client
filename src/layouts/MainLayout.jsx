import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import FloatingElements from "../components/Shared/FloatingElements/FloatingElements";

const MainLayout = () => {
  return (
    <div className="bg-base-100 min-h-screen relative">
      <FloatingElements />
      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)] relative z-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
