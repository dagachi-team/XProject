import { useEffect } from "react"
import { socket } from "../socket.js"

export function useSocket ({ handleNewPost, handlePostUpdated, handlePostDeleted }) {
    useEffect(() => {
        if(handleNewPost) socket.on("newPost", handleNewPost)
        if (handlePostUpdated) socket.on("postUpdated", handlePostUpdated)
        if (handlePostDeleted) socket.on("postDeleted", handlePostDeleted)

        return () => {
            if(handleNewPost) socket.off("newPost", handleNewPost)
            if (handlePostUpdated) socket.off("postUpdated", handlePostUpdated)
            if (handlePostDeleted) socket.off("postDeleted", handlePostDeleted)
        }
    }, [handleNewPost, handlePostUpdated, handlePostDeleted])
}