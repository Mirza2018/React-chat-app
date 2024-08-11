import React, { useState } from 'react';
import "./login.css"
import { toast } from 'react-toastify';

const Login = () => {

    const [avatar,setAvatar]=useState({
        file:"",
        url:""
    })
const handleAvater=e=>{
    if(e.target.files[0]){
        setAvatar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])
        })
    }
    
}

const handleLogin=(e)=>{
e.preventDefault()
toast.error("Hello")
}

    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                     <input type="text" placeholder='Email' name="email" />
                <input type="password" placeholder='Password' name="password" />
                <button>Sign In</button>
                </form>
               
            </div>
            <div className="separator"></div>

            
            <div className="item">
            <h2>Create an Account</h2>

            <form action="">

            
            <label htmlFor="file">
                <img src={avatar.url || "./avatar.png"} alt="" />
                Upload an Image </label>
                <input type="file" style={{display:"none"}} id="file" onChange={handleAvater} />
                <input type="text" placeholder='Username' name="username" />
                <input type="text" placeholder='Email' name="email" />
                <input type="password" placeholder='Password' name="password" />
                <button>Sign Up</button>
</form>

            </div>
        </div>
    );
};

export default Login;