import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import api from "../services/api";
import { Product } from "../utils/ProductInterface";
import { getUserProducts } from "../services/getUserProducts";
import { toast } from "react-toastify";


function MyProducts() {

    const [userProducts, setUserProducts] = useState<Product[]>([]);
    console.log("---" + userProducts)
    // useEffect(() => {
    //      const fetchProducts = async () => {
    //           try {
    //               const products = await getUserProducts();
    //               console.log("aq" + products)
    //               setUserProducts(products);
    //           } catch (err) {
    //               console.log(err);
    //           }
    //      };

    //     // fetchProducts();

    useEffect(() => {
        const getUserProducts = async () => {
            try {
                const userName = sessionStorage.getItem("name")
                const res = await api.get(`/product/user/${userName}`)
                const x = res.data.products
                console.log(x)
                setUserProducts(x)
                console.log(userProducts)
            } catch(err) {
                console.log(err)
            }
        }
        getUserProducts()
    }, [userProducts])


        // const getUserProducts = async () => {
        //     try {
        //         const userName = sessionStorage.getItem("name")
        //         const res = await api.get(`/product/user/${userName}`)
        //         const x = res.data
        //         console.log(x)
        //         setUserProducts(x)
        //     } catch(err) {
        //         console.log(err)
        //     }
        // }

        // getUserProducts()

    const handleDeleteProduct = async (id : any) => {
        try {
            const productId = id;
            const resDelete = await api.delete(`/product/${productId}`);

            if(resDelete.status === 200) {
                console.log("Product deleted succesfully ")
                toast.success('Produto retirado da Venda')
            } else {
                console.log('Failed to delete product.');
            }
            
        } catch (erro) {
            console.log(erro)
        }
        
    }

    return (
        <>
            <Header />
            <main className={`bg-gray-100 p-4 ${userProducts ? 'h-[1000px]' : 'h-0' }`}>
            {userProducts.length === 0 && (
                <h3 className="text-gray-400 text-2xl text-center mt-32 ">Nenhum produto cadastrado</h3>
            )}    
            {userProducts.map(({ name, price, image, id }) => (
                 <div className="bg-white w-[22rem] mt-4 shadow-md rounded-xl m-auto p-6">
                 <div className="flex justify-center items-center">
                     <h2 className="text-[24px] font-bold tracking-wide">
                        {name}
                     </h2>
                     <p className="">{price}</p>
                     <img
                         className="w-[10rem] h-[8rem]"
                         src={require(`../../../backend/uploads/${image}`)}
                         alt=""
                     />
                 </div>
                 <div className="mt-6 text-tertiary font-bold">
                     <button onClick={() => handleDeleteProduct(id)}  className="flex items-center gap-4">
                        Cancelar Venda
                     </button>
                 </div>
             </div>
            ))}
            </main>

            <Footer />
        </>
    )
}

export default MyProducts;
