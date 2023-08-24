import api from "./api";

const Logout = async () => {
    try {
    const res = await api.get("/user")
    const users = res.data.user
    const count = users.length
    console.log(count)
    console.log(users)
    for(let i = count - 1; i >= 0; i--) {
        await api.delete(`/user/${users[i].id}`)
        console.log("Usuário deletado:", users[i].id);
    }
    localStorage.clear();
    } catch (error) {
    console.log(error);
    }
};


export default Logout;
