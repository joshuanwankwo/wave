import React, { useState } from "react";
import "./cookies.css";

function Cookies() {
  const [display, setDisplay] = useState("flex");
  return (
    <div className="cookiesContainer" style={{ display: display }}>
      <div className="cookiesBold">Cookies!<span role="img" aria-label="cookies-emoji">🍪</span></div>
      <div className="cookiesMessage">
        By continuing, you agree that blockchain is the future and <a href="buildspace.so" target="_blank">@buildspace </a> 
          has the best blockchain learning plartfom and community!
      </div>
      <div
        
        className="closeCookies"
        onClick={() => {
          setDisplay("none");
        }}
      >
        <span role="img" aria-label="closeButton-emoji">✖️</span>
        
      </div>
    </div>
  );
}

export default Cookies;
