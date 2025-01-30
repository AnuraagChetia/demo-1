import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/user/getUsers");
        setUsers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage users={users} />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
