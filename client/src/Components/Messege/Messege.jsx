import React from 'react'
import './Messege.css';
const Messege = ({messege,user,classs}) => {
  if(user)
  {
    return (
        <div className={`messege_Box ${classs}`}>
        <h2>{`${user}: ${messege}`}</h2>  
        </div>
      )
  }

  else{
    return (
        <div className={`messege_Box ${classs}`}>
        <h2>{`You: ${messege}`}</h2>  
        </div>
      )
  }
}

export default Messege;
