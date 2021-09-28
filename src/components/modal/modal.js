import React from "react";
import "./modal.css";
// import Memoji from "../../assets/memoji.PNG";
// import Josh from "../../assets/josh.jpg"


function Modal({ modalDisplay, setModalDisplay }) {
  return (
    <div className="modalCon" style={{ display: modalDisplay }}>
      <div className="modalLeft">
        <span className="backButton" onClick={() => {
          setModalDisplay("none")
        }}>〈</span>
      </div>
      <div className="modalRight">
        <h1>A bit about this dude</h1>
        <p>
          Hi! my name is Joshua Nwankwo, I build pixel perfect user interfaces
          using JavaScript technologis like ReactJS, React Native and ElectronJS. I recently started coding smart contractsusing solidity and this is one of my pet projects on etheruem blockchain development.
          <br />
          <br />
          Wave is my own version of WavePortal, a task from @buildspace for
          learning blockchain using solidity and ethereum. I 100% recommend the
          @buildspace for learning, the course content, structure, community and
          tutors are all dope!
        </p>
      </div>
    </div>
  );
}

export default Modal;
