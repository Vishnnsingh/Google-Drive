import { createContext, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../src/Container/Home/Home'
import Layout from '../src/Container/Layout/Layout'
// import Sidebar from './Components/Sidebar/Sidebar'
import AddNewFile from '../src/Components/AddNewFile/AddNewFile'
import Login from './Container/Login/Login'
import Chat from './Components/chat/Chat'
import Mystate from './Components/Contaxt/Mystate'

function App() {
  // const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: "/add",
      element: < AddNewFile/>
  },

  {
    path: "/chat",
    element: < Chat/>
},

  {
    path: "/",
    element: < Login/>
},
  {
    path: "",
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
      
      <Mystate>


      <UserContext.Provider value={{user,setUser}}>


         <RouterProvider router={router} />


       </UserContext.Provider>

      </Mystate>



   
    
    </>
  )
}

export default App
export const UserContext = createContext();

