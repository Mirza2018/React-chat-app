import React, { useState } from 'react';
import './addUser.css'
import { db } from '../../../../library/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';

const AddUser = () => {

    const [user,setUser]=useState(null)


    const handleSearch=async (e)=>{
       e.preventDefault() 
       const formData=new FormData(e.target)
    //    const {userName}=Object.fromEntries(formData)
    const username=formData.get("username")

     try {
        const userRef=collection(db,"users");

        const q=query(userRef,where("username","==",username))

        const querySnapShort=await getDocs(q)
        if(!querySnapShort.empty){
            setUser(querySnapShort.docs[0].data())
        }

     } catch (err) {
        console.log(err);
        
     }
       
    }

    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder='UserName' name='username' />
                <button className='first'>Search</button>
            </form>
            {user && <div className="user">
                <div className="detail">
                    <img src={user.avatar || "./avatar.png"} alt="" />
                    <span>{user.username}</span>
                </div>
                <button>Add User</button>
            </div>}
        </div>
    );
};

export default AddUser;

