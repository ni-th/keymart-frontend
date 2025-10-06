import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { initFlowbite } from "flowbite";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { AuthProvider } from "./contex/AuthContex";
import Home from "./pages/Home";
import Register from "./pages/Register";

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initFlowbite();
  }, [location]);

  // Pages where sidebar should NOT appear
  // const noSidebarPaths = ['/login', '/register'];

  // const showSidebar = !noSidebarPaths.includes(location.pathname);

  return (
    <>
      <AuthProvider>
        <Header />
        <div className="max-w-6xl mx-auto flex justify-center mt-20">
          <div className="w-full m-2">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </>
  );
};

export default App;
