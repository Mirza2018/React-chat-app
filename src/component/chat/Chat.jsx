import React, { useEffect, useRef, useState } from 'react';
import "./chat.css"
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
    const [open,setOpen]=useState(false)
    const [text,setText]=useState("")

    const handleEmoji=e=>{
// console.log(e.emoji);
setText(text+e.emoji)
setOpen(!open)

    }
const endRef=useRef(null)
    useEffect(()=>{
        endRef.current?.scrollIntoView({behavior:"smooth"})
    },[])


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
            <div className="message own">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message">
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message own">
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message">
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message own">
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message">
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div>
            <div className="message own">
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    <img src="https://cdn2.unrealengine.com/world-of-goo-2-1-2880x1620-7e18f4b1ae55.jpg" alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div> 

            
            <div className="message">
            <img src="./avatar.png" alt="" />
                <div className="texts">
                    
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <span>1 min ago</span>
                </div>
            </div>
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