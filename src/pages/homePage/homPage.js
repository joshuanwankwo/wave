import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./homePage.css";
import waveportal from "../../utils/WavePortal.json";
import NavBabr from "../../components/navbar/navBabr";
import Cookies from "../../components/cookies/cookies";
// import Button from "../../components/button/button";
import Modal from "../../components/modal/modal";

function HomePage() {
  const [currentAccount, setCurrentAccount] = useState();
  const [allWaves, setAllWaves] = useState([]);
  const [message, setMessage] = useState("");
  const contractAddress = "0x5a056c90F1Fd8546B1E4D91d6Fb1b92abD7A1a19";
  const contractABI = waveportal.abi;
  const [modalDisplay, setModalDisplay] = useState("none")


  const testArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const checkIfWalletIsConnected = async () => {
    console.log("started");
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Please make sure your Metamask is connected");
        return;
      } else {
        // console.log("The wallet detail found is ", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        // console.log("Found an authorized account at: ", account);
        setCurrentAccount(account);
        getAllWaves();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const connectWallet = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (!ethereum) {
  //       console.log("Get MetaMask!");
  //       return;
  //     }

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });

  //     // console.log("Connected account ", accounts[0]);
  //     setCurrentAccount(accounts[0]);
  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
  // };

  const wave = async (e) => {
    e.preventDefault();
    setMessage("")
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
          gasLimit: 300000,
        });
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined...", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Total waves are ", count.toNumber(), " in number");
    
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderTotalWaves = async () => {
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

        // console.log(wavePortalContract);
        let count = await wavePortalContract.getTotalWaves();
        console.log("Total waves are ", count.toNumber(), " in number");
        checkIfWalletIsConnected();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWaves = async () => {
    console.log("getting all donations");

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
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
              address: wave.waiver,
              timestamp: new Date(wave.timeStamp * 1000),
              message: wave.message,
            },
          ]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    checkIfWalletIsConnected();
    renderTotalWaves();
  }, []);

  return (
    <div className="mainContainer">
      <Modal modalDisplay={modalDisplay} setModalDisplay={setModalDisplay}/>
      <div className="homePageContainer">
        <div className="homePageInnerCon">
          <NavBabr setModalDisplay={setModalDisplay}/>
          <div className="centerCon">
            <div className="centerConLeft">
              <h1 className="walletAddress">Hi, 0x4610...Cb4F</h1>
              <div className="description">
                How about you wave and get a cake? <br />
                Wave to a community of blockchain developers and enthusaists and you might get lucky and get some free eth sent to your wallet and that's it, no bank charges, no long bank que, no paper works,  no government! <br />
              </div>
              <form className="form" onSubmit={wave}>
                <input type="text" placeholder="Type a message" value={message} onChange={(e) => {
                  setMessage(e.target.value)
                }} />
                <button className="sendButton" onClick={wave}>👋</button>
              </form>
            </div>
            <div className="centerConRight">
              <div className="messagesHeader">
                <h1 className="total">{testArray.length}</h1>
                <span>Inbox</span>
              </div>
              <div className="messagesContainer">
                {testArray.map((test, key)=>{
                return(
                  <div className="transaction" key={key}>
                <div className="dp">J</div>
                <div className="info">
                    <div className="messageWrapper">
                    <h4>Address</h4>
                    <span className="recievedMessage">Message from the waver, just to clearify things</span>
                    </div>
                <span className="expand">〉</span>
                </div>
              </div>
                )
              })}
              </div>
            </div>
          </div>
          <Cookies />
        </div>
      </div>
















































      {/* <div className="dataContainer">
        <div className="header">Hi Satoshi! 👊🏾</div>

        <div className="bio">
          Life Hack: Save your happiness on blockchain so no one can change it
        </div>
        <input
          type="text"
          className="textBox"
          onChange={(e) => {
            console.log(e.target.value)
            setMessage(e.target.value);
          }}
        />

        <button className="waveButton" onClick={wave}>
          {buttonText}
        </button>

        <h1 className="totall">
          {"Awesom! we've got $" + totalWaves + " already in our wallet!"}
        </h1>
        <div className="transactionContainer">
          {allWaves.map((wave, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: "#efefef",
                  marginTop: "16px",
                  padding: "8px",
                }}
              >
                <div>Address: {wave.address}</div>
                <div>Time: {wave.timestamp.toString()}</div>
                <div>Message: {wave.message}</div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

export default HomePage;