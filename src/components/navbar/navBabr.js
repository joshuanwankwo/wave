import React, { useState } from "react";
import "./navBar.css";

function NavBabr({setModalDisplay}) {
  const [display, setDisplay] = useState("none");
  return (
    <div className="navBarContainer">
      {/* <h3>Logo👊🏾</h3> */}
      <h3>Wave<span role="img" aria-label="wave-emoji">👋</span></h3>
      <div className="iconCon">
        <span
        role="img" aria-label="notification-emoji"
          className="notificationBell"
          onClick={() => {
            setModalDisplay("flex")
          }}
        >
          💡
        </span>
        <span
        role="img" aria-label="menu-emoji"
          className="hamburgerMenu"
          onClick={() => {
            setDisplay("block");
          }}
        >
          ☰
        </span>
      </div>
      <div className="menuCon" style={{ display: display }}>
       <div className="menuConWrapper">
       <span
       role="img" aria-label="closeButton-emoji"
          className="menuCloseButton"
          onClick={() => {
            setDisplay("none");
          }}
        >
          ✖️
        </span>
        <ul className="menuList">
            <li>Dark Theme</li>
            <li><a href="https://www.github.com/joshuanwankwo">Github</a></li>
            <li><a href="https://www.twitter.com/judicodes">Twitter</a></li>
            <li>Disconnect Wallet</li>
        </ul>
       </div>
      </div>
      {/* <div className="messageCon" style={{ display: messageDisplay }}>
        <span
          className="menuCloseButton"
          onClick={() => {
            setMessageDisplay("none");
          }}
        >
          ✖️
        </span>
        <div className="message">
          By continuing, you agree that blockchain is the future and @buildspace
          has the best blockchain learning plartfom and community!
          By continuing, you agree that blockchain is the future and @buildspace
          has the best blockchain learning plartfom and community!
        </div>
      </div> */}
    </div>
  );
}

export default NavBabr;
