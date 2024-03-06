import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UseAuth } from '../Context/AuthContext.tsx';
import {toast} from 'react-hot-toast';
import{Box, Typography,Button} from "@mui/material";
import CustomizedInput from '../Components/Shered/CustomizedInput.tsx';
import { IoIosLogIn } from 'react-icons/io';

const Signup = () => {


  
  const navigate = useNavigate();
  const auth = UseAuth();

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    const name = formdata.get("name") as string
    const email = formdata.get("email") as string
    const password = formdata.get("password") as string

    try {
      toast.loading("Siginin Up",{id:"signup"});
      await auth?.signup(name,email,password);
    
      
      toast.success("Signed Up SuccessFully",{id:"signup"});
      
    } catch (error) {
      console.log(error);
      toast.error("Already Exist ",{id:"signup"});
      
    }
  }

  

  useEffect(()=>{
    if(auth?.user){
    return navigate("/login");
    }
  },[auth])




 

  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1} >
      <Box padding={8} mt={8} display={{md:"flex"}}>
         <img src="robott.png" alt='robott' style={{width:"500px",justifyContent:"space-around"}} />
      </Box>
    <Box display={"flex"} 
    flex={{xs:1,md:0.5}}
    justifyContent={"center"}
    padding={2}
    borderColor={"gray"}
    ml={"auto"}
    mr={"90px"}
    mt={10}>
    <form onSubmit={handleSubmit} 
    style={{
      margin:"auto",
      padding:"30px",
      boxShadow:"10px 10px 20px 10px red",
      borderRadius:"10px",
      border:"1px solid #000"
      
    }}>
      <Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",

      }}>
      <Typography variant='h4' textAlign="center" padding={2} fontWeight={600}  textTransform={"revert-layer"}>Signup</Typography>
      <CustomizedInput type='text' name='name' label='Name'/>
      <CustomizedInput type='email' name='email' label='Email'/>
      <CustomizedInput type='password' name='password' label='Password'/>
      <Button type='submit' sx={{
        px:2,
        py:1,
        mt:2,
        width:"450px",
        borderRadius:2,
        bgcolor:"#00fffc",
        ":hover":{
          bgcolor:"white",
          color:"black"
        },

      }} endIcon={<IoIosLogIn style={{color:"black"}}/>}>
       Signup
      </Button>
        </Box>
       <p style={{marginTop:'20px',textAlign:'center'}}>Already have an Account ?<Link to={"/login"} style={{textDecoration:'none',marginLeft:'7px' , color:'blue', textShadow:'1px 1px 20px 10px blue'}}>Login</Link></p>
    </form>
    </Box>

    </Box>

   
  )
}

export default Signup