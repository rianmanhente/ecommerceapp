import { Link, useNavigate } from "react-router-dom";
import { AiOutlineInstagram, 
AiOutlineFacebook, 
AiOutlineWhatsApp } 
from "react-icons/ai";
import Logout from "../services/logout";

function Footer() {

const navigate = useNavigate();
const handleLogout = () => {
   Logout();
   navigate("/");
}
    
    return(
        <>
            <main className="bg-primary p-4 flex flex justify-around items-center">
                <div className="flex flex-col">
                    <p className="text-xl font-bold text-greenColor">Inicio</p>
                    <Link className="text-white font-extrabold tracking-wider" to={'/home'}>Home</Link>
                    <Link className="text-white font-extrabold tracking-wider" to={'/Login'}>Login</Link>
                    <Link className="text-white font-extrabold tracking-wider" to={'/productsRegister'}>Vender</Link>
                    <Link className="text-white font-extrabold tracking-wider" onClick={handleLogout} to={'/'}>Sair</Link>
                </div>
                <div className="flex flex-col">
                    <p className="text-xl font-bold text-greenColor">Suporte</p>
                    <Link className="text-white font-extrabold tracking-wider" to={'/home'}>Home</Link>
                    <Link className="text-white font-extrabold tracking-wider" to={'/Login'}>Login</Link>
                    <Link className="text-white font-extrabold tracking-wider" to={'/productsRegister'}>Vender</Link>
                    <Link className="text-white font-extrabold tracking-wider" onClick={handleLogout} to={'/'}>Sair</Link>
                </div>
                <div className="flex flex-col">
                    <p className="text-xl font-bold text-greenColor">Sobre nós</p>
                    <Link className="text-white font-extrabold tracking-wider" to={'/home'}>Home</Link>
                    <Link className="text-white font-extrabold tracking-wider" to={'/Login'}>Login</Link>
                    <Link className="text-white font-extrabold tracking-wider" to={'/productsRegister'}>Vender</Link>
                    <Link className="text-white font-extrabold tracking-wider" onClick={handleLogout} to={'/'}>Sair</Link>
                </div>
            </main>
            <div>
            <div className="flex items-center p-4 bg-black">
                <p className="ml-8"><AiOutlineFacebook size={32} color={"white"}/></p>
                <p className=""><AiOutlineInstagram size={32} color={"white"}/></p>
                <p className=""><AiOutlineWhatsApp size={32} color={"white"}/></p>
                <p className="text-white ml-8">Mais Informacoẽs entre em contato com nossa equipe!</p>
            </div>
            </div>
        </>
    )
}

export default Footer;