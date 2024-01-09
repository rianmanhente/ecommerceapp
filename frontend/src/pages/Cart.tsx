import { useEffect, useState } from "react";
import Header from "../components/Header";
import { AiOutlineClose } from "react-icons/ai"
import { getCartItens } from "../services/getCartItens";
import { Product } from "../utils/ProductInterface";
import { getCartUserId } from "../services/getCartUserId";
import { data } from "autoprefixer";
import api from "../services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


export default function Cart() {

    const [cartItens, setCartItens] = useState([]);
    const [totalPriceCart, setTotalPriceCart] = useState<any>();
    const [totalItensCart, setTotalItensCart] = useState<any>();

    const navigate = useNavigate();

    useEffect(() => {
        getCartItens()
        .then((data) => {
            setCartItens(data)
            let sum = 0;
            let sumQuantity  = 0;
            cartItens.forEach((product : {price : any; quantity: any}) => {
                sumQuantity += product.quantity
                for(let i = 0; i < product.quantity; i++) {
                    sum += product.price
                }
                setTotalPriceCart(sum.toFixed(2))  
                console.log(sum)
                setTotalItensCart(sumQuantity)
                console.log(sumQuantity)
            })
        })
             
    },[cartItens])

    console.log(totalPriceCart)
    console.log(cartItens)

    const handleIncrementItem =  (productoId : string) => {
        getCartUserId()
        .then((cartUserId) => {
            try {
                api.put(`/cart/${cartUserId}/product/${productoId}`)
                .then(() => {
                toast.success("Produto adicionado no carrinho!")
                }).catch((err) => {
                toast.error("Ocorreu um erro. Tente novamente")
                })
            }catch(err) {
                console.log(err)
            }
        })
    }

    const handleDecrementItem =  (productoId : string) => {
        getCartUserId()
        .then((cartUserId) => {
            try {
                api.get(`/product/${productoId}`)
                .then(async (productData) => {
                    // const x = productData.data.product
                    const quantityOffThatProduct = productData.data.products.quantity
                    console.log(quantityOffThatProduct)
                    if(quantityOffThatProduct === 1) {
                        try {
                            await api.delete(`/cart/${cartUserId}/removeItemOffThatCart/${productoId}`)
                              .then(() => {
                                  toast.success("Produto removido do carrinho!")
                                  }).catch((err) => {
                                  toast.error("Ocorreu um erro. Tente novamente")
                                  })
                          } catch(err) {
                              console.log(err)
                          }
                    } else {
                        //rota para retirar o produto do cart 
                            try {
                                api.put(`/cart/${cartUserId}/removeOne/${productoId}`)
                                .then(() => {
                                toast.success("Produto retirado do carrinho!")
                                }).catch((err) => {
                                toast.error("Ocorreu um erro. Tente novamente")
                                })
                            }catch(err) {
                                console.log(err)
                            }                           
                        }
                 
                    console.log(productData.data.products)
                })
      
            }catch(err) {
                console.log(err)
            }
        })
    }

    const handleRemoveFromCart = (productoId : string) => {
        getCartUserId()
        .then(async (cartUserId) => {
            try {
                await api.delete(`/cart/${cartUserId}/removeItemOffThatCart/${productoId}`)
                  .then(() => {
                      toast.success("Produto removido do carrinho!")
                      }).catch((err) => {
                      toast.error("Ocorreu um erro. Tente novamente")
                      })
              } catch(err) {
                  console.log(err)
              }
        })
    }

    let show  = false;

    if (cartItens.length === 0 && !show) {
        show = true;
        navigate("/home");
        toast.info("Carrinho vazio, adicione algo para entrar no carrinho")
        return null;
    }

    // na vdd tem que checar no banco de dados porque se não o aviso vai aparecer porque só setado na variavel cartItens quando entra na pag
     
    return(
        <>
            <Header/>

            <main className="bg-[#262626]">
                <div className="text-center text-xl mt-8 pl-4 pr-6">
                <h2 className="text-white ">Seu carrinho tem um total de {totalItensCart} itens</h2>
                <p className="text-white">Limpar carrinho</p>
                </div>
                <hr className="border-none h-[1px] bg-white mt-8" />
                <div>
                {cartItens.map(({name, price, image, id, quantity}) => (
                    <div className="text-white flex items-center" >
                        <div className="flex items-center">
                            <div className="rounded-xl bg-white p-[10px] w-28 ml-6 mt-8">
                            <img className="w-32" src={require(`../../../backend/uploads/${image}`)} alt="" />
                            </div>
                        </div>
                        <div className="ml-8">
                            <div className="flex gap-10 mt-6">
                                <p className="text-[22px]">{name}</p>
                                {/* <button className="text-tertiary" onClick={() => handleRemoveFromCart(id)}>retirar produto</button> */}
                            </div>
                            <div className="flex items-center mt-6 gap-10">
                                <div>
                                <p className="text-tertiary font-bold">R${price}</p>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                <button onClick={() => handleIncrementItem(id)} className="bg-tertiary text-white rounded-md w-8 h-8 text-tertiary">+</button>
                                <p>{quantity}</p>
                                <button onClick={() => handleDecrementItem(id)} className="bg-white rounded-md w-8 h-8 text-tertiary border-tertiary ">-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>

            </main>

            <div className="w-full h-full text-white bg-[#262626] mb-[200px]">
                    <div className="flex items-center justify-between p-4">
                        <p className="text-xl">Total:</p>
                        <div className="flex flex-col mt-8">
                        <p className="ml-10 text-xl font-bold">R${totalPriceCart}</p>
                        <p className="mt-2">Adicionar Cupom!</p>
                        </div>
                    </div>
                    <div className="bg-tertiary h-12 flex items-center justify-center w-[360px] m-auto rounded-md">
                        <button className="font-bold text-[18px]">Finalizar Compra!</button>
                    </div>

            </div>

            <Footer/>

        </>
    )
}