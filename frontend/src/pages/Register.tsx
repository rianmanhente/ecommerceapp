import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RegisterModal } from "../components/RegisterModal";


function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [cpf , setCpf] = useState('');
    const [phoneNumber , setPhoneNumber] = useState('');
    const [file, setSelectedFile] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirm, setConfirm] = useState(false);

    console.log(isModalVisible)
 
    const navigate = useNavigate()  

    function handleConfirm() {
        const dataUser = new FormData();
        dataUser.append("name", name);
        dataUser.append("email", email);
        dataUser.append("password", password);
        dataUser.append("image", file);

        api.post("/user", dataUser)
        .then((res => {
            toast.success('Cadastrado com sucesso!')
            sessionStorage.setItem("name", name)
            sessionStorage.setItem("email", email)
            sessionStorage.setItem("cpf", cpf)
            sessionStorage.setItem("phoneNumber", phoneNumber)
            navigate("/login")
        }))
        .catch((error) => {
            toast.error(`Ocorreu um erro: ${error}`)
        })  
    }
    
    function handleSubmitForm(e : any) {
        e.preventDefault();
        console.log("foi")

        if(!file) {
            setIsModalVisible(true)
            console.log("ta caindo aq")
        } else {
            setIsModalVisible(false)    
            const dataUser = new FormData();
            dataUser.append("name", name);
            dataUser.append("email", email);
            dataUser.append("password", password);
            dataUser.append("image", file);
            
            api.post("/user", dataUser)
            .then((res => {
                toast.success('Cadastrado com sucesso!')
                sessionStorage.setItem("name", name)
                sessionStorage.setItem("email", email)
                sessionStorage.setItem("cpf", cpf)
                sessionStorage.setItem("phoneNumber", phoneNumber)
                navigate("/login")
            }))
            .catch((error) => {
                toast.error(`Ocorreu um erro: ${error}`)
            })
        }       
        }      
            
    function handleNotSubmitForm() {
        setIsModalVisible(false)
    }

    const handleFileInputChange = (e : any) => {
        // const file = e.target.files[0];
        const file = e.target.files[0]
        console.log(file)
        setSelectedFile(file);
      };

    return(
        <>
        <section className="bg-quaternary h-[100vh] w-[100vw]">
            <div className="flex justify-center items-center">
                <h1 className="mt-[2rem] text-tertiary text-2xl">EcommerceApp</h1>
            </div>
            <form onSubmit={handleSubmitForm} className="bg-white w-[24rem] flex flex-col m-auto mt-[2.8rem] h-[42rem] rounded-xl shadow-lg">
                <h2 className="mt-[40px] text-xl text-tertiary text-center">Cadastre-se</h2>
                <div className="flex justify-center mt-[2.8rem]">
                    <input value={name}
                        required
                        pattern="^[A-Za-z]*$"
                        onChange={(e: any) => setName(e.target.value)}
                        className="bg-gray-100 placeholder-gray-500 outline-none  h-[2.8rem] rounded-md w-[20rem]"
                        type="text"
                        placeholder="nome" />
                </div>
                <div className="flex justify-center mt-[1.4rem]">
                    <input
                        value={phoneNumber}
                        required
                        pattern="^[0-9]*$"
                        onChange={(e: any) => setPhoneNumber(e.target.value)}
                        className="bg-gray-100 placeholder-gray-500 outline-none  h-[2.8rem] rounded-md w-[20rem]"
                        type="text"
                        placeholder="telefone" />
                </div>
                <div className="flex justify-center mt-[1.4rem]">
                    <input
                        value={cpf}
                        required
                        pattern="^[0-9]*$"
                        onChange={(e: any) => setCpf(e.target.value)}
                        className="bg-gray-100 placeholder-gray-500 outline-none  h-[2.8rem] rounded-md w-[20rem]"
                        type="text"
                        placeholder="cpf" />
                </div>
                <div className="flex justify-center mt-[1.4rem]">
                    <input
                        required
                        pattern="^\S+@\S+$"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        className="bg-gray-100 placeholder-gray-500 outline-none  h-[2.8rem] rounded-md w-[20rem]"
                        type="email"
                        placeholder="email" />
                </div> 
                <div className="flex justify-center mt-[1.4rem]">
                    <input
                        required
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        className="bg-gray-100  placeholder-gray-500 outline-none h-[2.8rem] rounded-md w-[20rem]"
                        type="password"
                        placeholder="senha" />
                </div>
                <div className="flex flex-col text-center justify-center mt-[1.4rem]">
                    <label htmlFor="" className="text-lg text-tertiary">Escolha a sua foto de perfil</label>
                    <input onChange={handleFileInputChange} className=" ml-20 placeholder-gray-500 outline-none h-[2.8rem] rounded-md w-[20rem]" type="file" placeholder="foto de perfil" />
                </div>
                <div className="flex justify-center gap-[2.75rem]  mt-[1.4rem]">
                    <Link className="text-[20px] text-secondary" to={"/login"}>Login</Link>
                    <Link className="text-[20px] text-secondary" to={"/"}>Sair do App</Link>
                </div>
                <div className="flex justify-center mt-[2rem]">
                    <button type="submit" className="text-xl bg-tertiary w-[20rem] h-[2.8rem] rounded-md text-white">Cadastrar!</button>
                </div>
            </form>
            <RegisterModal 
            visible={isModalVisible} 
            handleConfirmSubmit={() => handleConfirm()} 
            handleNotSubmit={() => handleNotSubmitForm()} />   
        </section>
        </>
    )
}

export default Register;


