import iconcuen from "../assets/icon-cuenta.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCuenta } from "../store/cuentaSlice.js";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import icon1 from "../assets/Group1.png";
import icon2 from "../assets/Group2.png";
import icon3 from "../assets/Group3.png";
import icon4 from "../assets/Group4.png";
import iconflecha from "../assets/icon-flecha.png";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5566/accounts/1")
      .then((response) => {
        // Manejar la respuesta exitosa
        dispatch(fetchCuenta(response.data));
      })
      .catch((error) => {
        // Manejar errores
        console.error(error);
      });
  }, []);

  const cuentaahorro = useSelector((state) => state.cuenta);

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="max-md:w-[90%] max-lg:w-[90%] w-[60%] max-md:px-2 py-15 px-10 bg-white rounded-2xl shadow-md flex justify-around items-center gap-4 max-md:flex-col">
        <div id="panel-home" className="max-md:w-full w-[50%] h-full">
          <h1 className="text-[#024D3C] font-semibold text-[25px] font-sans">
            Mis Productos
          </h1>

          <div className="w-full flex max-md:justify-between gap-10 items-center mt-10 ">
            <div id="cuenta_ahorro" className="w-[50%*] ">
              <h2 className="text-black font-semibold font-sans">
                {cuentaahorro?.alias}
              </h2>
              <p className="text-gray-500 font-semibold text-[18px]">
                {cuentaahorro?.account_number}
              </p>
            </div>

            <div id="icon_envio" className="rounded-full">
              <img
                className="w-10 h-10 shadow-md rounded-full"
                src={iconcuen}
                alt="icon-cuenta"
              />
            </div>
          </div>

          <div className="w-full flex justify-between items-center mt-10 ">
            <div id="cuenta_ahorro" className="w-[50%*] ">
              <h2 className="text-gray-500 font-semibold font-sans">
                Saldo Disponible
              </h2>
              <div className="flex items-center jusfity-between gap-2">
                <p className="text-gray-900">NIO</p>
                <p className="text-black font-semibold text-[30px]">
                  {cuentaahorro?.balance}.00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="button-home" className="max-md:w-full w-[50%] h-full ">
          <div id="cuenta_ahorro" className="w-[50%*] ">
            <h2 className="text-black font-semibold text-[22px] font-sans">
              Operaciones Rapidas
            </h2>
          </div>

          <div className="w-full flex justify-between items-center mt-6">
            <Link
              to="/transferir-dinero"
              id="icon1"
              className="flex flex-col justify-center items-center gap-2 hover:bg-[#e0e0e0] rounded-lg p-2 transition-colors duration-200"
            >
              <img src={icon1} alt="Transferir dinero" />
              <p className="text-center text-gray-700 text-[13px] font-sans group-hover:text-white">
                Transferir Dinero
              </p>
            </Link>

            <Link
              to="#"
              id="icon1"
              className="flex flex-col justify-center items-center gap-2 hover:bg-[#e0e0e0] rounded-lg p-2 transition-colors duration-200"
            >
              <img src={icon2} alt="Transferir dinero" />
              <p className="text-center text-gray-700 text-[13px] font-sans group-hover:text-white">
                Pagar Servicio
              </p>
            </Link>

            <Link
              to="#"
              id="icon1"
              className="flex flex-col justify-center items-center gap-2 hover:bg-[#e0e0e0] rounded-lg p-2 transition-colors duration-200"
            >
              <img src={icon3} alt="Transferir dinero" />
              <p className="text-center text-gray-700 text-[13px] font-sans group-hover:text-white">
                Recargar celular
              </p>
            </Link>

            <Link
              to="#"
              id="icon1"
              className="flex flex-col justify-center items-center gap-2 hover:bg-[#e0e0e0] rounded-lg p-2 transition-colors duration-200"
            >
              <img src={icon4} alt="Transferir dinero" />
              <p className="text-center text-gray-700 text-[13px] font-sans group-hover:text-white">
                Retiro sin tarjeta
              </p>
            </Link>
          </div>

          <div className="w-full flex justify-between items-center mt-5 shadow-md p-2 rounded-lg">
            <div
              id="icon-flcha"
              className="  flex gap-5 items-center"
            >
              <div className="w-10 h-10 rounded-full">
                <img
                  className="w-full h-full"
                  src={iconflecha}
                  alt="icon-flecha"
                />
              </div>

              <div>
                <h2 className="text-black font-semibold font-sans text-[18px]">
                  Paga quincenal
                </h2>
                <p className="text-gray-500 font-semibold text-[15px]">Banco</p>
              </div>
            </div>

            <div>
              <h2 className="text-[#007A64] font-semibold font-sans text-[18px]">
                C$ {cuentaahorro?.balance}.00
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
