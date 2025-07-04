import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersSlice.js";
import logolafise from "../assets/logo_lafise.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
 
  function getUsers() {
    axios
      .get("http://localhost:5566/users/1")
      .then((response) => {
        // Manejar la respuesta exitosa
        console.log(response.data);
        dispatch(fetchUsers(response.data));
      })
      .catch((error) => {
        // Manejar errores
        console.error(error);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);

  const usuario = useSelector((state) => state.users);
  console.log("consola", usuario);

  return (
    <div className="w-full h-[100%] py-5 flex justify-center items-center bg-gradient-to-br from-[#024D3C] via-[#007A64] to-[#024D3C] shadow-ml">
      <div className=" w-[95%] h-full flex justify-between items-center">
        <Link to="/" id="logo" className="flex items-center gap-3">
          <img src={logolafise} alt="logo" />
          <p className="max-md:hidden text-white font-sans text-xl"><strong>Hola</strong>, {usuario?.full_name}</p>
        </Link>

        <div id="perfil-img" className="w-14 h-14 rounded-full overflow-hidden">
          <img className="w-full" src= {usuario?.profile_photo}/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
