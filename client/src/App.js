// import './App.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Post from "./pages/Post";
import Write from "./pages/Write";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./style.scss";

const Layout = () => {
  return(
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/post/:id",
        element: <Post/>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  
 
]);

function App() {
  return (
    <div className="app">
      <div className='container'>

      <RouterProvider router={router}/>
      </div>
    </div>
  );
}



export default App;
