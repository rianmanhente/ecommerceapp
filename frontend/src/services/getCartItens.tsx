import api from './api'; 

export const getCartItens = async() => {

    let userId;
    
    try {
        const response = await api.get("/user")
        userId = response.data.user[0].id
    }catch(err) {
        console.log(err)
    }

    try {
        const res = await api.get(`/cart/${userId}/associatedProducts`)
        const cartItens = res.data
        return cartItens

    }catch(err) {
        console.log(err)
    }

}