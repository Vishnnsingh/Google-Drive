import { createContext, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../src/Container/Home/Home'
import Layout from '../src/Container/Layout/Layout'
// import Sidebar from './Components/Sidebar/Sidebar'
import AddNewFile from '../src/Components/AddNewFile/AddNewFile'
import Login from './Container/Login/Login'

function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/add",
      element: < AddNewFile/>
  },

  {
    path: "/login",
    element: < Login/>
},
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />
      }
    ]
  }
  ])

  const [user, setUser] = useState({
    displayName: "",
    email: "",
    uid: ""
 });
  return (
    <>
    <UserContext.Provider value={{user,setUser}}>
    <RouterProvider router={router} />
    </UserContext.Provider>
    
    </>
  )
}

export default App
export const UserContext = createContext();

