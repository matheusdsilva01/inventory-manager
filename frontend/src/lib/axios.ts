import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api"

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message ??
            error.response?.statusText ??
            error.message ??
            "Erro desconhecido"

        return Promise.reject(new Error(message))
    }
)
