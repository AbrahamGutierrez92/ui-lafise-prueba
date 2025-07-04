import { useRoutes, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Home from "../pages/Home.jsx";
import Transfer_dinero from "../pages/transfer_dinero.jsx";

const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between items-center ">
      <div className="w-full">
        <Navbar/>
      </div>

        <div className="w-full flex justify-center items-center">
          <Outlet />
        </div>
    

    <footer className="w-full h-12 flex justify-center items-center bg-gradient-to-br from-[#024D3C] via-[#007A64] to-[#024D3C]">
      <p className="text-gray-100">© 2025 LaFise. Reservados todos los derechos.</p>
    </footer>
    </div>
  );
};


function Router() {
  const routes = [
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/transferir-dinero",
          element: <Transfer_dinero/>,
        },
      ],
    },
  ];

  return useRoutes(routes);
}

export default Router;