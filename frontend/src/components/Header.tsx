import { useEffect, useState } from "react";
import { AiOutlineAlignLeft, AiOutlineClose } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Logout from '../services/logout';


function Header() {

const [onPopUp, setOnPopUp] = useState(false);
const [profilePhoto, setPerfilPhoto] = useState();
const [user , setUser] = useState('');

const handlePopUp = () => {
    setOnPopUp(!onPopUp);
  }

const navigate = useNavigate();
const handleLogout = () => {
   Logout();
   navigate("/");
   
}

useEffect(() => {
  const getData = async() => {
    try {
      const res = await api.get("/user")
      const photo = res.data.user[0].image
      setPerfilPhoto(photo)
    }catch (error) {
      console.log(error)
    }
  } 

  getData();
},[])

  return(
    <>
        <header className="">
        <div className="flex justify-between p-4 items-center">
          <button className="" onClick={handlePopUp}>
            <AiOutlineAlignLeft size={32} />
          </button>
          <h2 className="text-tertiary text-xl">EcommerceApp</h2>
          <div>
          {profilePhoto ? ( 
          <img className="w-12 " src={require(`../../../backend/userPhoto/${profilePhoto}`)} alt="" />
          ):
          <img className="w-11 rounded-xl" alt="" src={require('../assets/perfil.jpg')}/>
          }
          </div>
        </div>
      </header>

      {onPopUp && (
            <>
              <div className="bg-drawer flex-col text-center absolute border-[1px] border-gray-200 left-0 -mt-28 w-[200px] h-[1100px]">
              <div className="ml-40 mt-16">
                    <button onClick={handlePopUp}>
                      {onPopUp ? <AiOutlineClose color="#8A8A8A" size={24}/> : ''}
                    </button>
                  </div>
                  <div className=" flex flex-col">
                    <Link to={"/home"} className="text-greenColor text-[21px] mt-14">Home</Link>
                    <Link className="text-greenColor text-[21px] mt-14" to={"/login"}>Login</Link>
                    <Link className="text-greenColor text-[21px] mt-14" to={"/registroprodutos"}>Vender</Link>
                    <Link onClick={handleLogout} className="text-greenColor text-[21px] mt-14" to={"/"}>Sair</Link>
                    <Link className="text-greenColor text-[21px] mt-14" to={"/meusProdutos"}>Meus Produtos</Link>
                  </div>
              </div>
            
            </>
          )}   
    </>
    )

}

export default Header