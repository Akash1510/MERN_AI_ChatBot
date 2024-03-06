import  {Toolbar}  from "@mui/material";
import {AppBar,Box} from "@mui/material";
import Logo from "./Shered/Logo.tsx";
import { UseAuth } from "../Context/AuthContext.tsx";
import NavLink from "./Shered/NavLink.tsx";

const Header = () => {

  

  const auth = UseAuth();
  return (
  <AppBar sx={{bgcolor:"transparent",position:"static",boxShadow:"none"}}>
    <Toolbar sx={{display:"flex"}}>
    <Logo/>
    <Box>

      {auth?.isLoggedIn?(
        <>
      <NavLink bg="#00fffc" to="/chat" text="Go TO Chat" textColor="black" />
    
      
      <NavLink bg="#51538f" textColor="white" to="/" text="logout" onClick={auth?.logout}/>
      </>):

(<>
       <NavLink bg="#00fffc" to="/login" text="login" textColor="black" />
    
      
    <NavLink bg="#51538f" textColor="white" to="/signup" text="signup" />
      </>)}

        </Box>
  </Toolbar>
  </AppBar>
  );
}

export default Header;
