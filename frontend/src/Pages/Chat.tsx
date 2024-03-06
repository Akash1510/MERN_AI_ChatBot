import { Box,Avatar,Typography, Button, IconButton } from "@mui/material"
import {useEffect,useState,useLayoutEffect,useRef} from "react";
import { red } from "@mui/material/colors";
import { UseAuth } from "../Context/AuthContext.tsx"
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { deleteUserChat,getUserChat,sendChatRequest } from "../Helpers/Api_Comminication.tsx";
import {toast} from "react-hot-toast";
import ChatItem from "../Components/chat/ChatItems.tsx";

type Message={
  role:"user"|"assistant",
  content:string
}

const Chat = () => {
  const auth = UseAuth();
const navigat = useNavigate();

const inputRef = useRef<HTMLInputElement | null>(null);
const [chatMessage,setChatMessage] = useState<Message[]>([]);

const handleSubmit = async()=>{
  const content = inputRef.current?.value as string;
  if(inputRef && inputRef.current){
    inputRef.current.value="";
  }
  const newMessage:Message={role:"user",content};
  setChatMessage((prev)=>[...prev,newMessage]);
  const chatData = await sendChatRequest(content);
  setChatMessage([...chatData.chats]);
};



const handleDeleteChats = async()=>{
  try {
     toast.loading("Delteting Chats",{id:"deletechats"});
     await deleteUserChat();
     setChatMessage([]);

     toast.success("Deleting chats SuccessFully",{id:"deletechats"});

    
  } catch (error) {
    console.log(error);
    toast.error("Deleting chats falied",{id:"deletechats"});
    
  }
};


useLayoutEffect(()=>{
  if(auth?.isLoggedIn && auth.user){
    getUserChat()
    .then((data)=>{
      setChatMessage([...data.chats]);
      toast.success("SuccessFully Loaded Chats",{id:"LoadChats"});
    })
    .catch((err)=>{
      console.log(err);
      toast.error("Loading Failed",{id:"loadChats"});
    });
  }
},[auth]);






useEffect(()=>{
  if(!auth?.user){
    return navigat("/login");
  }
 
},[auth]);

  return (
    <Box sx={{display:"flex",
    flex:1,
    width:"100%",
    height:"100%",
    mt:3,
    gap:3}}>
      <Box sx={{
        display:{md:"flex",xs:"none",sm:"none"},
        flex:0.2,
        flexDirection:"column"
      }}>

        <Box sx={{
          display:"flex",
          width:"100%",
          height:"60vh",
          bgcolor:"rgb(17,29,39)",
          borderRadius:5,
          flexDirection:"column",
          mx:3,
          }}>

            <Avatar
            sx={{
              mx:"auto",
              my:2,
              bgcolor:"white",
              color:"black",
              fontWeight:700,
            }}>
           {auth?.user?.name[0]}
           {auth?.user?.name[1][0]}

            </Avatar>

            <Typography sx={{
              mx:"auto",
              fontFamily:"work sans",
            }}>
              You are Talking to ChatBot 

            </Typography>
            <Typography sx={{
              mx:"auto",
              fontFamily:"work sans",my:4,p:3,
            }}>

              You can Ask some Quetions related to Knowledge,Bussiness,Advices,Education, etc. But avoid sharing personal information

            </Typography>

            <Button 
            onClick={handleDeleteChats} sx={{
              width:"200px",
              my:"auto",
              color:"white",
              fontWeight:700,
              borderRadius:3,
              mx:"auto",
              bgcolor: red[300],
              ":hover":{
                bgcolor:red.A400,

              },

            }}>
              Clear Conversation

            </Button>


        </Box>

      </Box>
      <Box sx={{display:"flex",
    flex:{md:0.8},
    flexDirection:"column",
    px:3,}}>
      <Typography sx={{
        fontSize:"40px",
        color:"white",
        mb:2,
        mx:"auto",
        fontWeight:600,
      }}>
        Model - GPT 3.5 Turbo

      </Typography>
      <Box sx={{
        width:"100%",
        height:"60vh",
        borderRadius:3,
        mx:"auto",
        display:"flex",
        flexDirection:"column",
        overflow:"auto",
        overflowX:"auto",
        overflowY:"auto",
        scrollbarColor:"gray black",
        scrollBehavior:"smooth",
        

      }}>

        {chatMessage.map((chat,index)=>(
       // '@ts-expect-error':unique prop key
          

          <ChatItem content={chat.content} role ={chat.role} key={index}/>
        ))}


      </Box>
      <div style={{
        width:"100%",
        borderRadius:8,
        backgroundColor:"transparent",
        display:"flex",
        margin:"auto",

      }}>
        {" "}
        <input ref ={inputRef} type="text" style={{
          width:"100%",
          backgroundColor:"transparent",
          marginBlock:"40px",
          padding:"30px",
          border:"1px solid #CCC",
          borderRadius:"20px",
          outline:"none",
          color:"white",
          fontSize:"20px",
          
        }} />
        <IconButton onClick={handleSubmit} sx={{color:"white",mx:1, fontSize:"30px"}}>
          <IoMdSend/>
        </IconButton>

      </div>

      </Box>
      </Box>
  )
}

export default Chat