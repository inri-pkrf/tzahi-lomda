import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCss/Hamburger.css';

const Hamburger = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [visitedPages, setVisitedPages] = useState(() => {
    return JSON.parse(sessionStorage.getItem('visitedPages')) || [];
  });
  const [isOpen, setIsOpen] = useState(false);

  const subjects = [
    { name: 'עמוד הבית', path: '/tzahi/home' },
    { name: 'בחירת סד"פ לחירום', path: '/tzahi/EmergencyRolls' },
    { name: 'הורדת עזרים מודפסים', path: '/tzahi/PdfFiles' },
    { name: 'שיעור דיגיטלי', path: 'https://sites.google.com/view/inri-tzahi/home', external: true },
  ];

  useEffect(() => {
    if (!visitedPages.includes(location.pathname)) {
      const updatedVisitedPages = [...visitedPages, location.pathname];
      setVisitedPages(updatedVisitedPages);
      sessionStorage.setItem('visitedPages', JSON.stringify(updatedVisitedPages));
    }
  }, [location.pathname]);

  const handleClick = () => setIsOpen(!isOpen);

  const handleMenuClick = (path, external) => {
    setIsOpen(false);
    if (external) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  return (
    <div>
      {/* כפתור המבורגר */}
      <div className="hamburger-icon" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
        <div className={`hamburger-line ${isOpen ? 'open' : ''}`} />
      </div>

      {/* תפריט נפתח */}
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <img src={`${process.env.PUBLIC_URL}/assets/media/whileLogo.svg`} alt="Decorative" className="whiteLogoHam" />
        <h1 className="menu-title">סד"פ לצח"י</h1>
        <ul className="menu-list">
          {subjects.map((subject, index) => (
            <React.Fragment key={index}>
              <li
                onClick={() => handleMenuClick(subject.path, subject.external)}
                className={`menu-item ${visitedPages.includes(subject.path) ? 'active' : ''}`}
              >
                {subject.name}
              </li>
              {index < subjects.length - 1 && <div className="lineMenu"></div>}
            </React.Fragment>
          ))}
        </ul>
        
        {/* משוב */}
        <div className="mashov-menu">
          <div className="mashovTextMenu">
            <br /> יש הערות על הממשק? יש מחמאות? מלאו את השאלון וצרו איתנו קשר
            <br />
            <a id="linkMenu" href="https://docs.google.com/forms/d/1poHLEiW0JkLQNmY9hKIfEqI4srthrLgwr2sHugtZea0/edit" target="_blank" rel="noopener noreferrer">
              בקישור הבא
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
