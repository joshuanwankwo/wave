import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./homePage.css";
import waveportal from "../../utils/WavePortal.json";
import NavBabr from "../../components/navbar/navBabr";
import Cookies from "../../components/cookies/cookies";
// import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";
import spinner from "../../assets/spinner.gif";
import DP from "../../assets/profile.svg";
import ReactGA from "react-ga";

function HomePage({ connectedWallet }) {
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [showLeft, setShowLeft] = useState();
  const [showRight, setShowRight] = useState();
  const [modalDisplay, setModalDisplay] = useState("none");
  const [expand, setExpand] = useState({
    address: "",
    message: "",
    time: "",
    state: false,
  });
  const [username, setUsername] = useState({
    complete: "",
    firstSix: "",
    lastFour: "",
    initial: "",
  });

  const contractAddress = "0x73fD2a3c5baFfdbE4ADe5e7CCC8D39b265e19158";
  const contractABI = waveportal.abi;

  const wave = async (e) => {
    ReactGA.event({
      category: "Wave",
      action: "Waved to the community",
      label: "Wave",
    });
    e.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log(wavePortalContract);
        let count = await wavePortalContract.getTotalWaves();
        console.log("Total waves are ", count.toNumber(), " in number");

        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 600000,
        });
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined...", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Total waves are ", count.toNumber(), " in number");
        setLoading(false);
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllWaves = async () => {
    console.log("getting all waves");


    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const waves = await wavePortalContract.getAllWaves();

        console.log(waves);

        let wavesCleaned = [];

        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waiver,
            timestamp: new Date(wave.timeStamp * 1000),
            message: wave.message,
          });
        });

        setAllWaves(wavesCleaned);

        wavePortalContract.on("NewWave", (from, timestamp, message) => {
          console.log("New Wave ", from, timestamp, message);

          setAllWaves((prevState) => [
            ...prevState,
            {
              address: from,
              timestamp: new Date(timestamp * 1000),
              message: message,
            },
          ]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserName = () => {
    let newUsername = JSON.parse(localStorage.getItem("userName"));
    console.log(newUsername);
    setUsername(newUsername);
  };

  const responsiveness = () => {
    if (window.innerWidth < 979 && chatMode) {
      console.log("ShowChat");
      setShowLeft(false);
      setShowRight(true);
    } else if (window.innerWidth < 979 && !chatMode) {
      setShowLeft(true);
      setShowRight(false);
    } else if (window.innerWidth > 979) {
      setShowLeft(true);
      setShowRight(true);
    }
  };

  window.addEventListener("resize", responsiveness);

  useEffect(() => {
    fetchUserName();
    responsiveness();
    getAllWaves();
  }, [message, expand]);


  return (
    <div className="mainContainer">
      <Modal modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} />
      <div className="homePageContainer">
        <div className="homePageInnerCon">
          <NavBabr setModalDisplay={setModalDisplay} />
          <div className="centerCon">
            <div
              className="centerConLeft"
              style={{ display: showLeft ? "flex" : "none" }}
            >
              <div className="greeting">
                <div className="description">
                  <h1 className="walletAddress">
                    Hi,{" "}
                    <span className="shortenedAddress">
                      {username.firstSix}...{username.lastFour}
                    </span>
                  </h1>
                  How about you wave and get a cake? <br />
                  Wave to a community of blockchain developers and enthusaists
                  and you might get lucky and get some free eth sent to your
                  wallet and that's it, no bank charges, no long bank que, no
                  paper works, no government! <br />
                </div>
              </div>
              <div
                className="unreadMessage"
                onClick={() => {
                  console.log("clicked", chatMode);
                  setChatMode(true);
                }}
              >
                Unread Messages
              </div>
              <form className="form" onSubmit={wave}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                {loading ? (
                  <span className="sendButton">
                    <img src={spinner} alt="spinner" />
                  </span>
                ) : (
                  <button className="sendButton" onClick={wave}>
                    <span role="img" aria-label="wave-emoji">
                      👋
                    </span>
                  </button>
                )}
              </form>
            </div>
            <div
              className="centerConRight"
              style={{ display: showRight ? "flex" : "none" }}
            >
              <div className="greeting">
                <div className="description">
                  <h1 className="walletAddress">
                    Hi,{" "}
                    <span className="shortenedAddress">
                      {username.firstSix}...{username.lastFour}
                    </span>
                  </h1>
                  How about you wave and get a cake? <br />
                  Wave to a community of blockchain developers and enthusaists
                  and you might get lucky and get some free eth sent to your
                  wallet and that's it, no bank charges, no long bank que, no
                  paper works, no government! <br />
                </div>
                {/* <Button buttonText="Unread" /> */}
              </div>
              <div className="messagesHeader">
                <h1
                  className="total"
                  onClick={() => {
                    if (expand.state) {
                      setExpand({ state: false });
                    } else {
                      return;
                    }
                  }}
                >
                  {expand.state ? "〈〈 " : null}
                  {allWaves.length}
                </h1>
                <span>Inbox</span>
              </div>
              <div className="messagesContainer">
                {expand.state ? (
                  <div className="expandedMessageWrapper">
                    <div className="expandedMessageCon">
                      <h1 className="expandedMessageDp">
                        <span role="img" aria-label="wave-emoji">
                          ✉️
                        </span>
                      </h1>
                      <h3 className="expandedMessageAddress">
                        {expand.address}
                      </h3>
                      <h3 className="expandedMessageText">
                        "{expand.message}"
                      </h3>
                      <h3 className="expandedMessageTime">{expand.time} </h3>
                    </div>
                  </div>
                ) : (
                  allWaves.reverse().map((wave, key) => {
                    return (
                      <div
                        className="transaction"
                        key={key}
                        onClick={() => {
                          console.log(expand);
                          setExpand({
                            state: true,
                            message: wave.message,
                            time: wave.timestamp.toString(),
                            address: wave.address,
                          });
                        }}
                      >
                        <img src={DP} alt="" className="dp" />
                        <div className="info">
                          <div className="messageWrapper">
                            <h4>{wave.address.substring(0, 6)}</h4>
                            <span className="recievedMessage">
                              {wave.message}
                            </span>
                          </div>
                          <span className="expand">〉</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <form className="form" onSubmit={wave}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                {loading ? (
                  <span className="sendButton">
                    <img src={spinner} alt="spinner" />
                  </span>
                ) : (
                  <button className="sendButton" onClick={wave}>
                    <span role="img" aria-label="wave-emoji">
                      👋
                    </span>
                  </button>
                )}
              </form>
            </div>
          </div>
          <Cookies />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
