import React, {useState, useEffect} from "react";
import ConnectPage from "./pages/connectPage/connectPage";
import HomePage from "./pages/homePage/homePage";
import ReactGA from 'react-ga';

function App() {
  ReactGA.initialize('UA-206713904-2');
  const [connectedWallet, setConnectedWallet] = useState(true)
  

  console.log("Connect is ", connectedWallet)


  const getConnectedWallet = (connected, walletAddress) => {
    setConnectedWallet(connected)
  }

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
     getConnectedWallet()
  }, [])

  
  return (
    <div>
     {connectedWallet ? <HomePage /> : <ConnectPage getConnectedWallet={getConnectedWallet}/>}
    </div>
  );
}

export default App;

