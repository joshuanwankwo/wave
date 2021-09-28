import React, {useState, useEffect} from "react";
import ConnectPage from "./pages/connectPage/connectPage";
import HomePage from "./pages/homePage/homePage";

function App() {
  const [connectedWallet, setConnectedWallet] = useState(true)

  console.log("Connect is ", connectedWallet)

  const getConnectedWallet = (connected) => {
    setConnectedWallet(connected)
  }

  useEffect(() => {
     getConnectedWallet()
  }, [])

  
  return (
    <div>
     {connectedWallet ? <HomePage /> : <ConnectPage getConnectedWallet={getConnectedWallet}/>}
    </div>
  );
}

export default App;

