
import { Link } from "react-router-dom";
import {Typography} from "@mui/material";
import { UseAuth } from "../../Context/AuthContext.tsx";



const Logo = () => {

  const auth = UseAuth();

const onHome = ()=>{
  if(auth?.isLoggedIn){
     auth.logout()
  }
}

 
  return (
    <div style={{   display:"flex", marginRight:"auto", alignItems: "center",gap: "15px"}}>
      

      <Link to={"/"}>
        <img src="openai.png" onClick={onHome} alt="openai"  width={"30px"} height={"30px"} className="image-inverted" />
      
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block"},
          mr: "auto",
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px", marginLeft:"3px" }}>MERN-GPT</span>


      </Typography>
         {auth?.isLoggedIn?(
            <Link to={"/"} style={{textDecoration:"none"}}>
            <Typography>
              <h3 style={{fontSize:"15px"}} onClick={onHome}>Home</h3>
            </Typography>
              </Link>
         ):(
          <Link to={"/"} style={{textDecoration:"none"}}>
          <Typography>
            <h3 style={{fontSize:"15px"}}>About</h3>
          </Typography>
            </Link>
         )}
         
          
     

       
    </div>
  );
};

export default Logo;
