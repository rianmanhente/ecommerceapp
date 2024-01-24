import api from './api'; 

export const getCartUserId = async() => {

    let cartUserId;
    
    try {
        const response = await api.get("/cart")
        cartUserId = response.data.cart[0].id
        return cartUserId
    }catch(err) {
        console.log(err)
    }
}