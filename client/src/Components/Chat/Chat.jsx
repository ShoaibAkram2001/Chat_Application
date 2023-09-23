import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import closeIcon from "../../Icons/closeIcon.png";
import scrollToBottom from "react-scroll-to-bottom";
import "../Chat/Chat.css";
import Messege from "../Messege/Messege";
import { Link } from "react-router-dom";

let socket;
const ENDPOINT = "http://localhost:5000/";

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [id, setId] = useState('');

  const [messege, setMessege] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connect',()=>{
      setId(socket.id);
    })


    const { name, room } = queryString.parse(location?.search);


    setRoom(room);
    setName(name);

    socket.emit("joined", { user: name, room });

    socket.on("welcome", (data) => {
      setMessages([...messages,data]);
      // console.log(user, message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages,data]);
     // console.log(`${user} : ${message}`);
    });

    return () => {
      //socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location?.search]);


  useEffect(()=>{

    socket.on('sendMessage',(data)=>{

      setMessages([...messages,data]);
      // console.log(user,message,Id);

      return()=>{
        socket.off(); 
      }
    })
  },[messages])

  const sendMessage = (event) => {
    event.preventDefault();

    if (messege) {
      const data={message:messege,id};
      setMessages([...messages,data]);
      socket.emit("message",data, () => setMessege(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <div className="container_header">
          <h1>{room}</h1>
          <Link to={'/'}>
  
          <img src={closeIcon} />
          </Link>
        </div>

        <scrollToBottom className="messages_box">
         {
          messages.map((Message,i)=><Messege user={(Message.id===id)?'':Message.user} messege={Message.message} classs={(Message.id===id)?'right':'left'}/>)

         }
        </scrollToBottom>

        <div className="input_container">
          <input
            className="input_message"
            type="text"
            placeholder="Enter Messege"
            onChange={(e)=>setMessege(e.target.value)}
          />
          <button  className="send_btn" type={"submit"} onClick={sendMessage}>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
