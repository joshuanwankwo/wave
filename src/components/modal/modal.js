import React from "react";
import "./modal.css";
// import Memoji from "../../assets/memoji.PNG";
// import Josh from "../../assets/josh.jpg"


function Modal({ modalDisplay, setModalDisplay }) {
  return (
    <div className="modalCon" style={{ display: modalDisplay }}>
      <div className="modalLeft">
        <div className="modalLeftInnerCon">
        <span className="backButton" onClick={() => {
          setModalDisplay("none")
        }}>〈</span>
        <span className="nameWrapper">
          <h1>Joshua Nwankwo</h1>
          <h5>@judicodes</h5>
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
          Wave is my own version of WavePortal, a task from @buildspace for
          learning blockchain using solidity and ethereum. I 100% recommend the
          @buildspace for learning blockchain development. the course content, structure, community and
          tutors are all dope!
        </p>
      </div>
    </div>
  );
}

export default Modal;
