import { useState } from 'react';
import { Route,Routes } from 'react-router-dom';
import Join from './Components/Join/Join'
import Chat from './Components/Chat/Chat';

import './App.css';


function App() {
  return (
       <div>
      <Routes >
        <Route exact path='/' element={<Join/>}/>
        <Route  path='/chat' element={<Chat/>}/>

      </Routes>
      </div>
   
  )
}

export default App
