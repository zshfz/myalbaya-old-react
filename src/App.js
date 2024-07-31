import appStyle from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "./context/Context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Board from "./pages/Board";
import Main from "./pages/Main";
import Message from "./pages/Message";
import MessageDetail from "./pages/MessageDetail";
import Rating from "./pages/Rating";
import Register from "./pages/Register";
import Single from "./pages/Single";
import UserProfile from "./pages/UserProfile";
import Write from "./pages/Write";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/board/:id",
        element: <Board />,
      },
      {
        path: "/rating/:id",
        element: <Rating />,
      },
      {
        path: "/single/:id/:id",
        element: <Single />,
      },
      {
        path: "/write/:id",
        element: <Write />,
      },
      {
        path: "/userprofile/:id",
        element: <UserProfile />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: "/messagedetail/:id",
        element: <MessageDetail />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return (
    <div className={appStyle.App}>
      <div className={appStyle.container}>
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </div>
    </div>
  );
}

export default App;
