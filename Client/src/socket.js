import { io } from "socket.io-client"

const BASE_URL = import.meta.env.VITE_USE_LOCAL === "true"
    ? import.meta.env.VITE_LOCAL_API_URL
    : import.meta.env.VITE_REMOTE_API_URL

export const socket = io(BASE_URL)
