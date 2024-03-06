import Header from "./Components/Header.tsx"

import { Route,Routes } from "react-router-dom"
import Home from "./Pages/Home.tsx"
import Login from "./Pages/Login.tsx"
import Signup from "./Pages/Signup.tsx"
import Chat from "./Pages/Chat.tsx"
import Not_Found_Page from "./Pages/Not_Found_Page.tsx"
import { UseAuth } from "./Context/AuthContext.tsx"


const  App=()=> {
  const auth = UseAuth();
  


  return (

    <main>
      <Header/>
      <Routes>
        <Route   path="/" element={<Home/>}/>
        <Route   path="/login" element={<Login/>}/>

          <Route   path="/signup" element={<Signup/>}/>
  
                
       {auth?.isLoggedIn && auth.user && (

         <Route   path="/chat" element={<Chat/>}/>
       )}
        <Route   path="/forgotpassword" element={<Not_Found_Page/>}/>
        
      </Routes>

   </main>
     )
  
}

export default App
