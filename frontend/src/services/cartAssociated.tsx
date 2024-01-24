import api from './api'; 

export const cartAssociated = async() => {

    let userId;
    
    try {
        const response = await api.get("/user")
        userId = response.data.user[0].id
        console.log(userId)
    }catch(err) {
        console.log(err)
    }

    try {
        api.put(`/cart/1/associate/${userId}`)

    }catch(err) {
        console.log(err)
    }

}