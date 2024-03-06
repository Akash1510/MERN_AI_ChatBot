import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer>
        <div style={{
            width:"100%",
            minHeight:"20vh",
            maxHeight:"30vh",
            marginTop:60,
        }} >
            <p style={{fontSize:"30px",textAlign:"center",padding:"20px"}}>
                Built With Love By 
                <span>
                    <Link color='white' className="nav-link" to={"www.linkedin.com/in/akash-jadhav-5b8236259"} >Akash Jadhav</Link>

                </span>
                💘
            </p>

        </div>
    </footer>
  )
}

export default Footer