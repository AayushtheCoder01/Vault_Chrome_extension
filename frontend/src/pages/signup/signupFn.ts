import axios from "axios";

const backend_Url = import.meta.env.VITE_BACKEND_URL

export async function  signupFunction(email: string, password: string) {
    const newUser = await axios.post(`${backend_Url}/signup`, {
            email: email,
            password: password
    })
    return newUser
}
