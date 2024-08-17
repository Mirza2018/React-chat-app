import React, { useState } from 'react';
import './addUser.css'
import { db } from '../../../../library/firebase';
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useUserStore } from '../../../../library/userStore';

const AddUser = () => {

    const [add,setadd]=useState(false)
    const [user,setUser]=useState(null)
    const {currentUser}=useUserStore()


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
    const handleAdd=async()=>{
        setadd(true)

        const chatRef=collection(db,"chats")
        const userChatRef=collection(db,"userchats")
        try {
           const newChatRef=doc(chatRef)
           
           await setDoc(newChatRef,{
                createdAt:serverTimestamp(),
                messages:[],
            });

            await updateDoc(doc(userChatRef,user.id),{
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:"",
                    receiverId:currentUser.id,
                    updatedAt:Date.now(),
                })
            })


            await updateDoc(doc(userChatRef,currentUser.id),{
                chats:arrayUnion({
                    chatId:newChatRef.id,
                    lastMessage:"",
                    receiverId:user.id,
                    updatedAt:Date.now(),
                })
            })



            
        } catch (err) {
            console.log(err);
            
        }
        setadd(false)
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
                <button onClick={handleAdd} disabled={add} >Add User</button>
            </div>}
        </div>
    );
};

export default AddUser;

