import Overlay from "./Overlay";
import { Product } from "../utils/ProductInterface";

interface ExtendedProduct extends Product {
    visible: boolean;
}

function ProductModal({visible, name, price, image, id} : ExtendedProduct) {
    
    if(!visible) {
        return null;
    }

    return(
        <Overlay width="" height="" bg="bg-white" key={id}>
                <div className="flex flex-col justify-center item1s-center mt-[60px] mr-8 gap-4">
                    <h1>aaaaaaaa</h1>
                    <p>{name}</p>
                    <p>{price}</p>
                    <img className="w-[220px] h-[110px]" src={require(`../../../backend/uploads/${image}`)} alt="" />
                </div>
        </Overlay>
    )
}

export default ProductModal;