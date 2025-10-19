import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

import '../componentsCss/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const goToEmergency = () => {
    navigate('/tzahi/EmergencyRolls'); 
  };
  const goToCredits = () => {
    navigate('/tzahi/Credits'); 
  };
  return (
    <div className="homepage-container">
      <h1 className='home-title'> עזר דיגיטלי
      <br></br> לשעת חירום לצח"י 
 </h1>
 <button className="pdf-go" onClick={() => navigate("/tzahi/PdfFiles")}>
  <img className='download-icon'  src={`${process.env.PUBLIC_URL}/assets/media/download.png`}/>
  הורדת עזרים להדפסה
</button>

 <p className="info1">
 לתחילת עבודה יש לבחור את מצב החירום ולאחר מכן את התפקיד בצוות, כדי לצפות בסד"פ המתאים.<br/> לרשותך, ניתן להוריד גם עזרים מודפסים
 </p>
 <button className='home-button' onClick={goToEmergency}>לבחירת מצב חירום ותפקיד</button>



<div className='greeting-div'>
  <hr className="dotted-line" />

 <p className='greeting'>עזר זה מרכז סדרי פעולות לעבודת הצח"י בשעת חירום  ומתאפשר בזכות שיתוף פעולה
</p>
<img
 src={`${process.env.PUBLIC_URL}/assets/media/tzahiText.png`}
 className='tzahi-text'
/>
<div className='white-div'></div>
<img
src={`${process.env.PUBLIC_URL}/assets/media/securityLogo.svg`}
className='socity-logo'

 />
<img
src={`${process.env.PUBLIC_URL}/assets/media/pakarorange.svg`}
className='pakar-logo'

 />
<img
src={`${process.env.PUBLIC_URL}/assets/media/pakarGrey.svg`}
className='pakar-grey'
 />
<img
src={`${process.env.PUBLIC_URL}/assets/media/comunityLogo.svg`}
className='comunity-logo'
 />
<img
src={`${process.env.PUBLIC_URL}/assets/media/collegeLogo.jpg`}
className='collage-logo'
 />
 <p className='credits'>התוכן מתבסס על תיק צוות חירום וחוסן יישובי (צח"י) שהתפרסם על-ידי השירות לעבודה קהילתית במשרד העבודה הרווחה והשירותים החברתיים (2018) כתיבה ועריכה: משה ברנדר ואבי סנדר</p>

 </div>

   <div className='tzahi-div'>
   <div>
    <p className='regular-text'> <strong>חדשים או חדשות בצח"י?</strong> זקוקים לרענון? הכנסו לשיעור הדיגיטלי לצח"י ללמידה על המשימות והתפקידים.</p>
    </div>
    <button 
  className="tzahi-button"
  onClick={() => window.location.href = 'https://sites.google.com/view/inri-tzahi/home'}
>
  לשיעור הדיגיטלי
</button>
   </div>
   <p className='feedback'>
  יש הערות? תוספות? שינויים?  
  <br />
  נשמח לשמוע איך אפשר להשתפר.  
  <br  />
  דברו איתנו  &nbsp;
  <a 
    id='linkMenuGrey' 
    href="https://docs.google.com/forms/d/e/1FAIpQLScrH0xIU_TVN4wRSC5Cq8LkvU8dzyWMbqCc4Uduv3ygyYEWMw/viewform?usp=sf_link" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    בקישור הבא
  </a>.
</p>
  <a className="linkCredits" onClick={goToCredits}>
  @קרדיטים
</a>
<div className="footer"></div>
    </div>
  );
};

export default Home;