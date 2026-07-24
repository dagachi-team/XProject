import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"
import "./App.css"
import Root from "./pages/Root"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Post from "./pages/Post"
import Auth from "./pages/Auth"
import { socket } from "./socket.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Login /> },
      { path: "home", element: <Home /> },
      { path: "post", element: <Post /> },
      { path: "auth", element: <Auth /> }
    ]
  }
])

function App() {
  // 좋아요 알림 수신 로직
  useEffect(() => {
    const handleLikeNotification = (data) => {
      const myId = localStorage.getItem("useridx")

      if (!myId) return

      const strMyId = String(myId)
      const strAuthorId = String(data.authorId)
      const strLikerId = String(data.likerId)

      if (strMyId === strAuthorId) {
        toast.info("게시글에 좋아요가 달렸습니다", {
          position: "bottom-right",
          autoClose: 3000,
          className: "custom-toast liked-toast"
        })
      } else if (strMyId === strLikerId) {
        toast.info("게시글에 좋아요를 눌렀습니다", {
          position: "bottom-right",
          autoClose: 3000,
          className: "custom-toast"
        })
      }
    }

    socket.on("postLikedNotification", handleLikeNotification)

    return () => {
      socket.off("postLikedNotification", handleLikeNotification)
    }
  }, [])
  
  // 새 글작성 알림 수신 로직
  useEffect(() => {
    const handleNewPostNotification = (post) => {
      const myId = localStorage.getItem("userid")
      if (post.userid === myId) return   // 본인 글이면 알림 안 띄움

      toast.info("새로운 글이 올라왔습니다", {
          position: "bottom-right",
          autoClose: 3000,
          className: "custom-toast"
      })
    }

    socket.on("newPost", handleNewPostNotification)

    return () => {
        socket.off("newPost", handleNewPostNotification)
    }
}, [])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App