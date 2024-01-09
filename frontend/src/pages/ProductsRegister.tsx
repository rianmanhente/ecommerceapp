import { useState } from "react";
import Header from "../components/Header";
import api from "../services/api";
import { toast } from "react-toastify";
import Footer from "../components/Footer";


function ProductsRegister() {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const userName = sessionStorage.getItem("name")
    console.log(userName)


    const handlePostProducts =  (e : any) => {
        e.preventDefault();

        const dataProducts = new FormData();
        dataProducts.append("name", productName);
        dataProducts.append("price", productPrice);
        dataProducts.append("category", productCategory);
        dataProducts.append("image", selectedFile);

        
        api.post(`/product/user/${userName}`, dataProducts)
        .then((res) => {
            toast.success("Produto cadastrado com sucesso")
        })
        .catch((error) => {
            toast.error(`Ocorreu algum erro ${error}`)
            console.log(error)
        })
    }

    const handleFileInputChange = (e : any) => {
        const file = e.target.files[0]
        console.log(file)
        setSelectedFile(file);
      };
    
    
    return (
        <>
            <Header/>
            
            <main className="flex h-[600px] justify-center items-center">
                <form action="" onSubmit={handlePostProducts}>
                    <h1 className="-mt-8 text-greenColor text-2xl mt-2 mb-2 text-center">Cadastre seu Produto! <br></br>Faça parte dos vendedores<br/></h1>
                    <div className="flex-col justify-center p-4">
                    <input type="text" onChange={(e) => setProductName(e.target.value)} className="px-8 py-3 rounded-xl border-[0.2px] border-greenColor shadow-md outline-none" placeholder="nome do produto"/>
                    </div>
                    <div className="flex-col justify-center p-4">
                    <input type="text" onChange={(e) => setProductPrice(e.target.value)} className="px-8 py-3 rounded-xl border-[0.2px] border-greenColor shadow-md outline-none" placeholder="preço de venda"/>
                    </div>
                    <div className="flex-col justify-center p-4">
                    <input type="text" onChange={(e) => setProductCategory(e.target.value)} className="px-8 py-3 rounded-xl border-[0.2px] border-greenColor shadow-md outline-none" placeholder="categoria" />
                    </div>
                    <div className="flex-col justify-center p-4">
                    <input type="file" id="fileInput" onChange={handleFileInputChange}  placeholder="foto do produto" />
                    </div>
                    <div className="">
                        <button className="bg-greenColor text-white text-lg py-3 px-20 ml-4 rounded-xl shadow-md">Cadastrar Produto!</button>
                    </div>
                </form>
            </main>
            
            <Footer/>   
        </>
    )
}

export default ProductsRegister;