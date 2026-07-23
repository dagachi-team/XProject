import { useEffect } from "react"
import { socket } from "../socket.js"

export function useSocket ({ handleNewPost }) {
    useEffect(() => {
        if(handleNewPost) socket.on("newPost", handleNewPost)

        return () => {
            if(handleNewPost) socket.off("newPost", handleNewPost)
        }
    }, [handleNewPost])
}