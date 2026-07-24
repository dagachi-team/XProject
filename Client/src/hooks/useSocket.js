import { useEffect } from "react"
import { socket } from "../socket.js"

export function useSocket ({ handleNewPost, handlePostUpdated, handlePostDeleted, handlePostLiked  }) {
    useEffect(() => {
        if(handleNewPost) socket.on("newPost", handleNewPost)
        if (handlePostUpdated) socket.on("postUpdated", handlePostUpdated)
        if (handlePostDeleted) socket.on("postDeleted", handlePostDeleted)
        if (handlePostLiked) socket.on("postLiked", handlePostLiked)

        return () => {
            if(handleNewPost) socket.off("newPost", handleNewPost)
            if (handlePostUpdated) socket.off("postUpdated", handlePostUpdated)
            if (handlePostDeleted) socket.off("postDeleted", handlePostDeleted)
            if (handlePostLiked) socket.off("postLiked", handlePostLiked)

        }
    }, [handleNewPost, handlePostUpdated, handlePostDeleted, handlePostLiked])
}