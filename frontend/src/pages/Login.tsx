import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassoword] = useState('');

    const dataUserLogar = {
        email: email,
        password: password
    }

    const navigate = useNavigate();

    function handleSubmit(e : any) {
        e.preventDefault();
        
        api.post('/login', dataUserLogar).then((res) => {
            toast.success("Logado com sucesso!")
            navigate('/home')
        })
        .catch((error) => {
            if(error.response.status === 401) {
               toast.error("Senha ou email incorretos")
            } else {
                toast.error("Ocorreu um erro. Tente novamente")
            }
        })
    }

    return(
        <section className="bg-quaternary h-[100vh] w-[100vw]">
        <div className="flex justify-center items-center">
            <h1 className="mt-[4rem] text-tertiary text-2xl">EcommerceApp</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white w-[24rem] flex flex-col m-auto mt-[2.8rem] h-[28rem] rounded-xl shadow-lg">
            <h2 className="mt-[40px] text-xl text-tertiary text-center">Faça Login agora mesmo!</h2>
            <div className="flex justify-center mt-[2.8rem]">
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 placeholder-gray-500 outline-none  h-[2.8rem] rounded-md w-[20rem]" type="email" placeholder="email" />
            </div>
            <div className="flex justify-center mt-[1.4rem]">
                <input value={password} onChange={(e) => setPassoword(e.target.value)} className="bg-gray-100  placeholder-gray-500 outline-none h-[2.8rem] rounded-md w-[20rem]" type="password" placeholder="senha" />
            </div>
            <div className="flex justify-center gap-[2.75rem] mt-[4rem]">
                <Link className="text-[20px] text-secondary" to={"/"} >Cadastre-se</Link>
                <Link className="text-[20px] text-secondary" to={"/"} >Sair do App</Link>
            </div>
            <div className="flex justify-center mt-[2rem]">
                    <button type="submit" className="text-xl bg-tertiary w-[20rem] h-[2.8rem] rounded-md text-white">Logar!</button>
            </div>
        </form>
        <div className="flex justify-center mt-[2.8rem]">
            <h3 className="text-xl text-secondary">Login agora<br></br>Aproveite nossas Promoçoes<br></br>Bem vindos ao melhor EcoomerceApp</h3>
        </div>
        <div className="flex justify-center mt-[4rem]">
            <h3 className="text-xl text-secondary">Login agora<br></br>Aproveite nossas Promoçoes<br></br>Bem vindos ao melhor EcoomerceApp</h3>
        </div>
    </section>
    )
}

export default Login;