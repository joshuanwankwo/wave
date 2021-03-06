import React from "react";
import "./modal.css";
import verified from "../../assets/verified.svg";
import back from "../../assets/back.svg";
// import Memoji from "../../assets/memoji.PNG";
// import Josh from "../../assets/josh.jpg"


function Modal({ modalDisplay, setModalDisplay }) {
  return (
    <div className="modalCon" style={{ display: modalDisplay }}>
      <div className="modalLeft">
        <div className="modalLeftInnerCon">
        <span className="backButton" onClick={() => {
          setModalDisplay("none")
        }}> <img src={back} alt="" /> </span>
        <span className="nameWrapper">
          <h1>Joshua Nwankwo</h1>
          <h5>@judicodes   <img src={verified} alt="" /> </h5>
        </span>
        </div>
      </div>
      <div className="modalRight">
        <h1><span role="img" aria-label="idea-emoji">💡</span></h1>
        <p>
          Hi! my name is Joshua Nwankwo, I build pixel perfect user interfaces
          using JavaScript technologis like ReactJS, React Native and ElectronJS. I recently started coding smart contracts using solidity and this is one of my pet projects on etheruem blockchain development.
          <br />
          <br />
          Wave is my own version of WavePortal, a task from <a href="buildspace.so" target="_blank">@buildspace</a> for
          learning blockchain using solidity and ethereum. I 100% recommend the
          <a href="buildspace.so" target="_blank">@buildspace</a> for learning blockchain development. the course content, structure, community and
          tutors are all dope!
        </p>
      </div>
    </div>
  );
}

export default Modal;
