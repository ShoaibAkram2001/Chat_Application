const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
const cors=require('cors');

const app=express();
require('dotenv').config();
const PORT=process.env.PORT ||4000

const {addUser,removeUser,getUser,getUsersInRoom,} =require('./user.js');


app.use(cors())



const server=http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173', // Replace with your frontend URL
      methods: ['GET', 'POST'], // Specify allowed methods
    },
  });

  let users=[];

  io.on("connection", (socket) => {
    
    console.log('We have start a new connection');
   
    socket.on('joined',({user,room})=>{

      //console.log(`${user} has joined the ${room}`)
      users[socket.id]=user;
      socket.emit('welcome',({user:"Admin",message:`Welcome to the chat, ${users[socket.id]}`}))
      socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`})
      

      socket.on("message",({message,id})=>{
        console.log('send id :',id);
      io.emit('sendMessage',{user:users[id],message,Id:id});
      })
    })



  
    
    socket.on('disconnect',(socket)=>{
        console.log(`${users[socket.id]} has left`)
    })


    })

  


server.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})