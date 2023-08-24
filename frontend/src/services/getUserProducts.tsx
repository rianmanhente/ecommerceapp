import api from "./api"

export const getUserProducts = async () => {
    try {
        const res = await api.get("/product/:userName")
        const userProducts = res.data;
        return userProducts
    } catch (err) {
        console.log(err);
        throw err;
    }
}