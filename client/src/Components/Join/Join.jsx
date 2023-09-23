import React, { useState } from "react";
import '../Join/Join.css';
import { Link } from "react-router-dom";

export default function Join() {
  const [room, setRoom] = useState(null);
  const [name, setName] = useState(null);


  return (
    <div className="Join_Container">
      <div className="Join_inner_Container">
        <h1 className="heading">Join</h1>
        <div className="border_container"></div>
        <form>
          <input
            className="form_input"
            type="text"
            placeholder="Name"
            onChange={(e)=>setName(e.target.value)}
          />
          <input
            className="form_input"
            type="text"
            placeholder="Room"
            onChange={(e)=>setRoom(e.target.value)}
          />

          <Link  onClick={!name ||!room ? (e) => e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
            <button className="form_input form_btn" type="submit">
              SIGN IN
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
