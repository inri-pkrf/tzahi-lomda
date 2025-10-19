import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../componentsCss/Header.css';
import Hamburger from './Hamburger'; 
import NavBar from './NavBar'; 

function Header() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      {/* תפריט ניווט – המבורגר למובייל, ניווט רגיל לדסקטופ */}
      {isMobile ? <Hamburger /> : <NavBar />}

      {/* לוגו ראשי */}
      <img
        src={`${process.env.PUBLIC_URL}/assets/media/collegeLogo.png`}
        className="App-logo"
        alt="logo"
      />
      {/* {isMobile &&(
        <div>
        <span className="divider-header">|</span>

        <img
        src={`${process.env.PUBLIC_URL}/assets/media/tzahiLogo1.jpg`}
        className="tzahi-logo"
        alt="logo"
        /> 
        </div>

      )}
      */}
      

      <button
        className="back-homeNav"
        onClick={() => navigate('/tzahi/home')} 
      ></button>

      {!isMobile && (
        <img
          className="tzahi-white-nav"
          src={`${process.env.PUBLIC_URL}/assets/media/whileLogo.svg`}
          alt="Decorative Logo"
        />
      )}
      {/* <img src={`${process.env.PUBLIC_URL}/assets/media/info.png`}  className="info-icon"  onClick={()=> navigate("/tzahi/Credits" ) } /> */}

      <img
        src={`${process.env.PUBLIC_URL}/assets/media/orange.png`}
        alt="Decorative"
        className="decorative-photo"
      />
    </header>
  );
}

export default Header;
