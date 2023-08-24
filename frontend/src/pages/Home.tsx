import api from "../services/api";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { AiOutlineHeart, 
AiFillHeart, 
AiOutlineArrowRight,
AiOutlineSearch, 
} from "react-icons/ai";
import Header from "../components/Header";
import { Link, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import ProductModal from "../components/ProductModal";
import { getProducts } from "../services/getProducts";
import { Product } from "../utils/ProductInterface";

function Home() {

const user = sessionStorage.getItem("name");
const firstLetter = user?.slice(0, 1).toLocaleUpperCase();
const Letters : any = user?.slice(1, user.length).toLocaleLowerCase();
const userName = firstLetter + Letters
const [products, setProducts] = useState<Product[]>([]);
const [favorites, setFavorites] = useState<String[]>([]);
const [isModalVisible, setIsModalVisible] = useState(false);

const handleFavorites = (id : string) => {
  
  const isFavorites = favorites.includes(id)  

  if(isFavorites) {
    setFavorites(favorites.filter(productId => productId !== id));
  } else {
    setFavorites([...favorites, id])
  }
  
};


const handleOpenModal = (id : string) => {
  setIsModalVisible(true);
  // console.log(id)
}


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const products = await getProducts()
      setProducts(products);
    } catch (err) {
      console.log(err);
    }
  };

  fetchProducts();
}, []);

console.log(products)

const carousel = useRef<any>();
const [width, setWidth] = useState(0);

useEffect(() => {
  // console.log(carousel.current?.scrollWidth, carousel.current?.offsetWidth);
  setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
}, []);


  return (
    <div>
      <Header/>

      <div className="p-6">
          <h3 className="text-[18px] ml-4">Oi, {userName}</h3>
          <h1 className="text-[28px] mt-4 font-sans">
            O que você está procurando hoje ?
          </h1>
          
          <div className="flex items-center gap-1 mt-4">
            <button
              type="submit"
              className="mt-4 p-[9px] rounded-md border-2 border-black bg-black"><AiOutlineSearch size={24} color="white"/></button>
            <input  
              type="search"
              className="outline-none border-[1px] h-[3rem] w-[22rem] mt-4 placeholder-gray-500"
              placeholder="pesquisar"
            />
          </div>
        </div>
        
      
      <main className="bg-gray-100 p-4">
        <div className="bg-white w-[22rem] shadow-sm rounded-xl m-auto p-6">
          <div className="flex justify-center items-center">
            <h2 className="text-[24px] font-bold tracking-wide">
              TMA-2
              <br />
              Modular
              <br />
              Headphone
              <br />
            </h2>
            <img
              className="w-[12rem] h-[8rem]"
              src={require("../assets/headphone.jpg")}
              alt=""
            />
          </div>
          <div className="mt-6 text-tertiary font-bold">
            <button className="flex items-center gap-4">
              Comprar agora <AiOutlineArrowRight />{" "}
            </button>
          </div>
        </div>

        <div className="">
          <motion.div
            ref={carousel}
            className="overflow-hidden"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div
              className="flex gap-[40px]"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >

            {products.map(({name, price , image, id}) => (
              <>
              <motion.div className="shadow-sm rounded-xl mt-12 bg-white min-w-[148px] flex p-2 flex-col ">
              <ProductModal visible={isModalVisible} name={name} image={image} price={price} id={id} key={id} />
                  <div className="">
                    <div>
                      <button onClick={() => handleFavorites(id)}>
                        {favorites.includes(id) ? (
                          <AiFillHeart size={20} color={"#01CF83"} />
                        ) : (
                          <AiOutlineHeart size={20} color={"#01CF83"} />
                        )}
                      </button>
                    </div>
                  </div>  
                  <div onClick={() => handleOpenModal(id)}>
                    <img
                      className="mt-3 p-[6px]"
                      src={require(`../../../backend/uploads/${image}`)}
                      alt="" />
                    <p className=" tracking-wider font-semibold ml-1 mt-8 text-[18px]">
                      {name}
                    </p>
                    <p className="text-tertiary font-semibold ml-2 mb-3">
                      R${price}
                    </p>
                  </div>
                </motion.div>
                </> 
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <section className="mt-8 mb-[88px]">
        <h1 className="text-center text-3xl tracking-wider">
          Cadastre-se seu <strong className="text-greenColor">produto</strong>
        </h1>
        <h2 className="text-center text-3xl tracking-wider">
          Se torne um  <strong className="text-greenColor">vendedor</strong>
        </h2>

        <div className="flex justify-center items-center mt-16">
          <button className="bg-greenColor rounded-xl p-[14px]">
            <Link className="text-white text-xl px-16 font-sans" to={"/registroprodutos"}>Cadastrar Produto</Link>
          </button>
        </div>
      </section> 

      <Footer/>
    </div>
  );
}

export default Home;
