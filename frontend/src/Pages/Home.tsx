import React from 'react'

import { Box, useMediaQuery ,useTheme} from '@mui/material'
import Ani from '../Components/typer/typinAni.tsx'
import Footer from '../Components/Footer/footer.tsx';


const Home = () => {
  const theme = useTheme();

  const isBeloMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box width={"100%"} height={"100%"}>

    <Box sx={{
      display:"flex",
      width:"100%",
      flexDirection:"column",
      alignItems:"center",
      mx:"auto",
      mt:3
    }}>
      <Box>
    <Ani />
      </Box>
    <Box sx={{width:"100%",
  display:"flex",
  flexDirection:{md:"row",xs:"column",sm:"column"},
  gap:5,
  my:10
}}>
    <img src='robot.png' alt="robot" style={{width:"200px",margin:"auto"}} />
    <img className="image-inverted rotate" src='openai.png' alt="openai" style={{width:"200px",margin:"auto"}} />

    </Box>
    <Box sx={{display:"flex",mx:"auto"}}>
      <img src='chat.png' alt='chatbot' style={{display:"flex",margin:"auto",width:isBeloMd?"80%":"60%", borderRadius:20,boxShadow:"-5px -5px 105px 10px #64f3d5 ",marginTop:20,marginBottom:20,padding:10,}}/>
    </Box>
    </Box>
    <Footer/>
    </Box>
  )
}

export default Home