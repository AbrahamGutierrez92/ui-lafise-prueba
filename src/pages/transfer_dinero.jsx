import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import confirm from "../assets/confirm.png";
import exitos from "../assets/exitos.png";

const transfer_dinero = () => {
  const cuentaahorro = useSelector((state) => state.cuenta);
  console.log("consola cuenta ....", cuentaahorro);
  const [showModal, setShowModal] = useState(false);
  const [modalexto, setModalExito] = useState(false);
  
  const initialSrate = {
    origin: "",
    cuenta: "",
    monto: "",
    current: "",
  };
  const [cuentas, setCuentas] = useState(initialSrate);

  const handleCuenta = (e) => {
    setCuentas({
      ...cuentas,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const enviarcuenta = async (e) => {
    e.preventDefault();

    const cuentadata = {
      origin: cuentaahorro.account_number,
      destination: cuentas.cuenta,
      amount: {
        currency: cuentaahorro.currency,
        value: parseFloat(cuentas.monto),
      },
    };

    try {
      await axios
        .post("http://localhost:5566/transactions", cuentadata, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Transferencia exitosa", response.data);
        
          
          setShowModal(false);

          if (response.data) {
            setModalExito(true);
          }
        })
        .catch((error) => {
          console.error("Error al realizar la transferencia", error);
        });
    } catch (error) {
      console.error("Error al enviar la cuenta:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="max-md:w-[80%] w-[60%] max-md:px-2 py-15 px-10 bg-white rounded-2xl shadow-md flex justify-around items-center gap-4 max-md:flex-col">
        <main className="flex flex-col flex-grow justify-start">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            ¿A quién le enviaras dinero hoy?
          </h2>

          <form className="flex flex-col gap-5" onSubmit={openModal}>
            <div className="flex flex-col">
              <label for="cuenta" className="text-sm text-gray-700 mb-1">
                Ingresa el número de cuenta
              </label>
              <input
                id="cuenta"
                type="text"
                name="cuenta"
                value={cuentas.cuenta}
                placeholder="N. de cuenta"
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#007A64]"
                onChange={handleCuenta}
              />
            </div>

            <div className="flex flex-col">
              <label for="monto" className="text-sm text-gray-700 mb-1">
                ¿Cuánto dinero le enviarás?
              </label>
              <input
                id="monto"
                type="text"
                name="monto"
                value={cuentas.monto}
                placeholder="C$500"
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#007A64]"
                onChange={handleCuenta}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#007A64] text-white text-sm font-medium cursor-pointer"
            >
              Enviar
            </button>
            <div className="w-full flex justify-center items-center">
              <Link to="/" className="">
                Volver al menu
              </Link>
            </div>
          </form>
        </main>
      </div>

      {/* MODAL*/}
      {showModal && (
        <div className="fixed inset-0 bg-[#024d3c85] bg-opacity-20 flex items-center justify-center z-50">
          <div className="max-md:w-[70%] w-[35%] h-auto bg-white rounded-lg p-6 shadow-lg">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-lg text-red-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              x
            </button>
            <h3 className="text-lg text-center font-semibold mb-4">
              Confirmar el envio
            </h3>
            <div className="flex flex-col items-center mb-6">
              <div className="w-full">
                <img
                  src={confirm}
                  alt="Confirmar"
                  className="w-[25%] h-[25%] mx-auto mb-2"
                />
              </div>
              <h4>Total a enviar</h4>
              <p className="text-3xl font-semibold">
                C$ {(cuentas.monto)}
              </p>

              <div className="text-center mt-4">
                <h4>Al número de cuenta</h4>
                <p className="text-xl text-gray-500 font-semibold">
                 {cuentas.cuenta}
                </p>
              </div>

              <div className="text-center mt-2">
                <h4>Cuenta a utilizar para el envío</h4>
                <p className="text-xl text-gray-500 font-semibold">
                 {cuentaahorro.account_number}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={enviarcuenta}
                className="w-[100%] py-2 text-white bg-[#024D3C]  hover:bg-green-900 rounded-3xl"
              >
                Confirmar el envio
              </button>
            </div>
          </div>
        </div>
      )}
      {/* FINAL Modal */}


       {/* MODAL EXITO */}
      {modalexto && (
        <div className="fixed inset-0 bg-[#024d3c85] bg-opacity-20 flex items-center justify-center z-50">
          <div className="max-md:w-[70%] w-[35%] h-auto bg-white rounded-lg p-4 shadow-lg">
            <button
              onClick={() => setModalExito(false)}
              className="px-4 py-2 text-lg text-red-600 bg-gray-200 rounded hover:bg-gray-300"
            >
              x
            </button>

            <div className="w-fill bg-[#007a6448] h-[150px] flex justify-center items-center mb-4 rounded-b-lg">
               <div id="icono-exito" className="w-[50%] h-[50%] flex justify-center items-center">
                <img className="w-23" src={exitos} alt="exitos_icon"/>
               </div>
            </div>

            <div className="w-full h-[1px] bg-gray-200"></div>

            <h3 className="text-4xl text-center font-semibold mt-2 mb-4 font-sans">
              Envío con éxito
            </h3>
            <div className="flex flex-col items-center mb-2">
              <p className="text-lg text-black font-semibold">
                Resumen de tu envío.
              </p>
            </div>

            <div className="flex flex-col items-center mb-3">
              <p className="text-base text-gray-500 font-semibold">
                Resumen de tu envío.
              </p>
              <p className="text-base text-black">
                C$ {(cuentas.monto)}
              </p>
            </div>

             <div className="flex flex-col items-center mb-3">
              <p className="text-base text-gray-500 font-semibold">
                Al número de cuenta.
              </p>
              <p className="text-base text-black">
                {cuentas.cuenta}
              </p>
            </div>

            <div className="flex flex-col items-center mb-3">
              <p className="text-base text-gray-500 font-semibold">
                Cuenta utilizada para el envío.
              </p>
              <p className="text-base text-black">
                {cuentaahorro.account_number}
              </p>
            </div>

            <div className="w-full flex justify-center items-center mt-4 text-center">
              <Link to="/" className="w-[100%] py-2 text-white bg-[#024D3C] hover:bg-green-900 rounded-3xl">Volver al inicio</Link>
            </div>
          </div>
        </div>
      )}
      {/* FINAL Modal EXITO */}
    </div>
  );
};

export default transfer_dinero;
