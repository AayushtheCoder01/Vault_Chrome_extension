import axios from "axios";
const backend_Url = import.meta.env.VITE_BACKEND_URL

export async function userLogin(email: string, password: string) {
    const user = await axios.post(`${backend_Url}/login`, {
        email: email,
        password: password
    })
    return user
}