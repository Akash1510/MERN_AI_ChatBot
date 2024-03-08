
import {Box,Typography,Button}  from '@mui/material'
import CustomizedInput from '../Components/Shered/CustomizedInput.tsx'
import { IoIosLogIn } from "react-icons/io";
import {toast} from "react-hot-toast";
import { UseAuth } from '../Context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';


const Login = () => {

const auth = UseAuth();

const navigate = useNavigate();


  const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    const email = formdata.get("email") as string;
    const Password = formdata.get("password") as string;
    

    try {
      
      toast.loading("Login In",{id:"login"});

      await auth?.login(email,Password);

      toast.success("Login In SuccessFully",{id:"login"});

    } catch (error) {

      console.log(error);
      
      toast.error("Login In Failed" , {id:"login"});
      
    }   
  };

  useEffect(()=>{
    if(auth?.user){
      return navigate("/chat");
    }

  },[auth]);
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}>

      <Box padding={8} mt={8} display={{md:"flex", sm:"none",xs:'none'} }>
      <img src="airobot.png" alt="robot" style={{width:"400px",justifyContent:"space-around"}}/>
      

      </Box>

      <Box display={"flex"} flex={{xs:1,md:0.5}} justifyContent={'center'} alignItems={"center"} padding={2} ml={"auto"} mt={16}>
        <form
        onSubmit={handleSubmit}
         style={{
          margin:"auto",
          marginRight:"120px",
          padding:"30px",
          boxShadow:"10px 10px 20px 10px red",
          borderRadius:"10px",
          border:"1px solid #000"
        }} >

          <Box sx={{display:'flex', flexDirection:"column",justifyContent:"center",}}>
          <Typography variant='h4' textAlign="center" padding={2} fontWeight={600}>Login</Typography>
         <CustomizedInput type="email" name="email" label="Email" />
         <CustomizedInput name="password" type="password" label="Password"/>
         <Button type="submit" sx=
         {{px:2,
          py:1,
          mt:2,
          width:"450px",
          borderRadius:2,bgcolor:"#00fffc",
          ":hover":{
            bgcolor:"white",
            color:"black"

            
          },
          }} endIcon={<IoIosLogIn style={{marginLeft:"3px" ,color:"black"}} />}>
            Login
            
            </Button>
          </Box>
          <div style={{display:'flex',padding:3 }}>

          <p style={{marginTop:'20px',textAlign:'center'}}>Don't have an Account ?<Link to={"/signup"} style={{textDecoration:'none',marginLeft:'7px' , color:'blue', textShadow:'1px 1px 20px 10px blue'}}>Sign Up</Link></p>
          <p style={{marginTop:'20px',textAlign:'center'}}>Don't Remember a Password ?<Link to={"/change-password"} style={{textDecoration:'none',marginLeft:'7px' , color:'blue', textShadow:'1px 1px 20px 10px blue'}}>Forgot Password</Link></p>

          </div>
        </form>
      </Box>

    </Box>
  )
}

export default Login