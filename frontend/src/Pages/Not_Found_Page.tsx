import React from 'react'
import { Box ,Button,Typography} from '@mui/material'
import CustomizedInput from '../Components/Shered/CustomizedInput.tsx'

import { IoIosLogIn } from 'react-icons/io'
import { UseAuth } from '../Context/AuthContext.tsx'






const ForgotPassWord = () => {

  const auth = UseAuth();
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const fordata = new FormData(e.currentTarget);
  
    const email = fordata.get("email") as string;
    auth?.forgot(email);
  
  
}
    
  return (
 
    <Box display={"flex"} flex={{xs:1,md:0.5}} justifyContent={'center'} alignItems={"center"} padding={2} ml={"auto"} mt={16}>
    <form
    onSubmit={handleSubmit}
     style={{
      margin:"auto",
      padding:"30px",
      boxShadow:"10px 10px 20px 10px red",
      borderRadius:"10px",
      border:"1px solid #000"
    }} >

      <Box sx={{display:'flex', flexDirection:"column",justifyContent:"center",}}>
      <Typography variant='h4' textAlign="center" padding={2} fontWeight={600}>Reset Password</Typography>
     <CustomizedInput name="email" type="email" label="Email"/>
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
        reset password
        
        </Button>
      </Box>
    </form>
    </Box>
  )
}

export default ForgotPassWord