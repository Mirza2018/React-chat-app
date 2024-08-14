import React, { useState } from 'react';
import "./login.css"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db} from '../../library/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../library/upload';


const Login = () => {

    const [avatar,setAvatar]=useState({
        file:"",
        url:""
    })

const []


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

}

const handleRegister=async (e)=>{
e.preventDefault()
const formData=new FormData(e.target)
const {username,email,password}=Object.fromEntries(formData)


try{
    const res=await createUserWithEmailAndPassword(auth,email,password)

    const imgUrl=await upload(avatar.file)
    await setDoc(doc(db,"users",res.user.uid),{
        username,email,id:res.user.uid,avatar:imgUrl,
        blocked:[],
    })
    await setDoc(doc(db,"userchats",res.user.uid),{
        chats:[],
    })







toast.success("Account created! You can login now!")
}




catch(err){
    toast.error(err)
    console.log(err);

}

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

            <form onSubmit={handleRegister}>

            
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