


import React from 'react'
import {TypeAnimation} from "react-type-animation"

const Ani = () => {
  return (
    <TypeAnimation 
    // some substring at the start will only be typed once ,initilly
    sequence={["Chat with Your Own AI",
1000,
"Built With OpenAI🤖",
2000,
"Your Own Customized ChatGPT💻",
1500,
]}

speed={70}
style={{
    fontSize:"60px",
    color:"white",
    display:'inline-block',
    
    textShadow:"1px 1px 50px green",
  
}}
repeat={Infinity}
    />
  )
}

export default Ani