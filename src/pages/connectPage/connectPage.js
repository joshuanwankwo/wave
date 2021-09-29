import Button from "../../components/button/button";
import "./connectPage.css";
import React, { useEffect, useState } from "react";

function ConnectPage({getConnectedWallet}) {
  // const [currentAccount, setCurrentAccount] = useState();
  const [errorMessage, setErrorMessage] = useState(false)

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
        // const account = accounts[0];
        // console.log("Found an authorized account at: ", account);
        // setCurrentAccount(account);
        getConnectedWallet(true)
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected account ", accounts[0]);
      const walletAddress = accounts[0].toString();

      var userName = {
        complete: walletAddress,
        firstSix: walletAddress.substring(0, 6),
        lastFour: walletAddress.substring(walletAddress.length - 4),
        initial: walletAddress.substring(0, 1)
      }

      localStorage.setItem('userName', JSON.stringify(userName));
      
      getConnectedWallet(true)
    } catch (error) {
      console.log(error);
      // localStorage.setItem('userName', JSON.stringify({
      //   complete: "",
      //   firstSix: "",
      //   lastFour: "",
      //   initial: ""
      // }))
      return;
    }
  };


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="connectMainContainer">
      <div className="connectLeft">
      <h1>Wave<span role="img" aria-label="cookies-emoji">👋</span></h1>
      </div>
      <div className="connectRight">
        <Button
          buttonText="Sign In "
          thumb="👎"
          bg="#00000048"
          cursor="not-allowed"
          action={()=>{
            setErrorMessage(true)
          }}
        />
        <h6 className="errorMessage" style={{display: errorMessage ? "block" : "none"}}>Sorry we've moved to Web3!</h6>
        <Button
          buttonText="Connect Wallet "
          thumb="👍"
          bg="#ffd44796"
          cursor="pointer"
          action={()=>{
              connectWallet();
          }}
        />
      </div>
    </div>
  );
}

export default ConnectPage;
