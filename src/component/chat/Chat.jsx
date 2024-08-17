import React, { useEffect, useRef, useState } from 'react';
import "./chat.css"
import EmojiPicker from 'emoji-picker-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../library/firebase';
import { useChatStore } from '../../library/chatStore';

const Chat = () => {
    const [chat,setChat]=useState()
    const [open,setOpen]=useState(false)
    const [text,setText]=useState("")
  const {chatId}=useChatStore()

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


    return (
        <div className='chat'>
           <div className="top">

            <div className="user">
                <img src="./avatar.png" alt="" />
                <div className="textsc">
                    <span>Mirza</span>
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
            <div className="message own" key={message?.createAt}>
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    {message?.img && <img src={message?.img} alt="" />}
                    
                    <p>{message?.text}</p>
                    {/* <span>1 min ago</span> */}
                </div>
            </div> 
           )) }

            
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
                <img src="./img.png" alt="" />
                <img src="./camera.png" alt="" />
                <img src="./mic.png" alt="" />
            </div>
            <input type="text" placeholder='Type a message...' onChange={e=>setText(e.target.value)}  value={text}/>
            <div className="emoji">
                <img onClick={()=>setOpen(!open)} src="./emoji.png" alt="" />
                <div className="picker">
                     <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                </div>
               
            </div>
            <button className='sendButton'>send</button>
           </div>
        </div>
    );
};

export default Chat;