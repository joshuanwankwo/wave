import React, { useState } from "react";
import "./navBar.css";
import github from "../../assets/github.svg";
import twitter from "../../assets/twitter.svg";

function NavBabr({setModalDisplay}) {
  const [display, setDisplay] = useState("none");
  // document.addEventListener('click', (e)=>{
  //   console.log(e.target.className);
  //   console.log("display is ", display);
  //   if(display !== "none" && e.target.className !== "menuCon"){
  //     setDisplay("none")
  //   }else{
  //     return null;
  //   }

  // })

    // //function to close the modal onClick of the outside modal
    // document.addEventListener(
    //   "click",
    //   function (e) {
    //     if (e.target.className === "menuCon") {
    //       closeModal();
    //     }
    //   },
    //   false
    // );
  
    // function closeModal() {
    //   setDisplay("none");
    // }


  return (
    <div className="navBarContainer">
      <div className="navBarInnerCon">
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
            <li>Dark Theme <h5 className="tag">Coming soon</h5></li>
            <li>  <a href="https://www.github.com/joshuanwankwo" rel="noopener noreferrer" target="_blank">Github <img src={github} alt="" /></a></li>
            <li>  <a href="https://www.twitter.com/judicodes" rel="noopener noreferrer" target="_blank">Twitter <img src={twitter} alt="" /></a></li>
            <li>Disconnect Wallet<h5 className="tag">Coming soon</h5></li>
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
    </div>
  );
}

export default NavBabr;
