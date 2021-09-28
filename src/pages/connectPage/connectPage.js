import Button from "../../components/button/button";
import "./connectPage.css";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function ConnectPage({getConnectedWallet}) {
  const [currentAccount, setCurrentAccount] = useState();

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
      setCurrentAccount(accounts[0]);
      getConnectedWallet(true)
    } catch (error) {
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <div className="connectMainContainer">
      <div className="connectLeft"></div>
      <div className="connectRight">
      <h1>Wave<span role="img" aria-label="cookies-emoji">👋</span></h1>
        <Button
          buttonText="Sign In "
          thumb="👎"
          bg="#e930492d"
          cursor="not-allowed"
        />
        <Button
          buttonText="Connect Wallet "
          thumb="👍"
          bg="#30e9772d"
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
