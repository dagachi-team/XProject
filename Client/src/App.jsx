import { useEffect } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
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
  // 알림 수신 로직 추가
  useEffect(() => {
    const handleLikeNotification = (data) => {
      const myId = localStorage.getItem("useridx")

      if (!myId) return

      const strMyId = String(myId)
      const strAuthorId = String(data.authorId)
      const strLikerId = String(data.likerId)

      if (strMyId === strAuthorId) {
        toast.info("회원님의 게시글에 누군가 좋아요를 눌렀습니다!", {
          position: "top-right",
          autoClose: 3000,
        })
      } else if (strMyId === strLikerId) {
        toast.info("게시글에 좋아요를 눌렀습니다!", {
          position: "top-right",
          autoClose: 3000,
        })
      }
    }

    socket.on("postLikedNotification", handleLikeNotification)

    return () => {
      socket.off("postLikedNotification", handleLikeNotification)
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