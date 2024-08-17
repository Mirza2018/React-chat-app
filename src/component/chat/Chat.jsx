import React, { useEffect, useRef, useState } from 'react';
import "./chat.css"
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../library/firebase';
import { useChatStore } from '../../library/chatStore';
import { useUserStore } from '../../library/userStore';
import upload from '../../library/upload';

const Chat = () => {
    const [chat,setChat]=useState()
    const [open,setOpen]=useState(false)
    const [text,setText]=useState("")
    const [img,setImg]=useState({
        file:"",
        url:""
    })


    const handleImg=(e)=>{

        if(e.target.files[0]){
            setImg({
                file:e.target.files[0],
                url:URL.createObjectURL(e.target.files[0])
            })
        }

         

           
    }
    


  const {chatId,user,isCurrentUserBlocked,isReceiverBlocked}=useChatStore()
  const {currentUser}=useUserStore()

    const handleEmoji=e=>{
// console.log(e.emoji);
setText(text+e.emoji)
setOpen(!open)

    }
const endRef=useRef(null)
    useEffect(()=>{
        endRef.current?.scrollIntoView({behavior:"smooth"})
    },[])

    useEffect(()=>{
        const unSub=onSnapshot(doc(db,"chats",chatId),(res)=>{
            setChat(res.data())
        })
        return()=>{
            unSub();
        }
    },[chatId])
    // console.log(chat)
const handleSend=async ()=>{

    if(text==="") return;

    let imgUrl=null

    try {


        if(img.file){
            imgUrl=await upload(img.file)
        }




        await updateDoc(doc(db,"chats",chatId),{
            messages:arrayUnion({
                senderId:currentUser.id,
                text,
                createdAt:new Date(),
                ...(imgUrl && {img:imgUrl }),
            }),

        })


            const userIDs=[currentUser.id,user.id];
            userIDs.forEach(async(id)=>{

           


            const userChatsRef=doc(db,"userchats",id)
            const userChatsSnapshot=await getDoc(userChatsRef)

            if(userChatsSnapshot.exists()){
                const userChatsData=userChatsSnapshot.data()
                const chatIndex=userChatsData.chats.findIndex(c=>c.chatId===chatId)
                userChatsData.chats[chatIndex].lastMessage=text;
                userChatsData.chats[chatIndex].isSeen=id===currentUser.id ? true :false ;
                userChatsData.chats[chatIndex].updateAt=Date.now();

    


                await updateDoc(userChatsRef,{
                    chats:userChatsData.chats,
                });
            }
      });


    } catch (err) {
        console.log(err);
        
        
    }
    setImg({
        file:null,
        url:""
    })
  
setText("")


}

    return (
        <div className='chat'>
           <div className="top">

            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <div className="textsc">
                    <span>{user?.username}</span>
                    <p>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
            <div className="icons">
<img src="./phone.png" alt="" />
<img src="./video.png" alt="" />
<img src="./info.png" alt="" />
            </div>
           </div>


           <div className="center">
   
           {chat?.messages?.map((message)=>(
            <div className={message.senderId ===currentUser?.id ? "message own" :"message"} 
            key={message.createdAt}
            >


            <img src={"./avatar.png"} alt="" />
                <div className="texts">
                    {message?.img && <img src={message?.img} alt="" />}
                    
                    <p>{message?.text}</p>
                    {/* <span>1 min ago</span> */}
                </div>
            </div> 
           )) }

        {img?.url && <div className="message own">
        <div className='texts'>
            <img src={img.url} alt="" />
        </div>
        </div>}

            
            {/* <div className="message">
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div> */}



            <div ref={endRef}></div>
           </div>
           <div className="bottom">
            <div className="icons">
                <label htmlFor="file" >
                    <img src="./img.png"alt="" />
                </label>
                
                <input type="file" id='file'  style={{display:'none'}}  onChange={handleImg} />

                <img src="./camera.png" alt="" />
                <img src="./mic.png" alt="" />
            </div>
            <input type="text" 
            placeholder={isCurrentUserBlocked || isReceiverBlocked ?"You cannot send a message":'Type a message...'} 
            onChange={e=>setText(e.target.value)}  value={text}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
            />
            <div className="emoji">
                <img onClick={()=>setOpen(!open)} src="./emoji.png" alt="" />
                <div className="picker">
                     <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                </div>
               
            </div>
            <button className='sendButton' onClick={handleSend}
            disabled={isCurrentUserBlocked || isReceiverBlocked}
            
            >send</button>
           </div>
        </div>
    );
};

export default Chat;