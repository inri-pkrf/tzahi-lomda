// src/components/NavBar.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../componentsCss/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [visitedPages, setVisitedPages] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('visitedPages')) || [];
    } catch {
      return [];
    }
  });

  const subjects = [
  { name: 'עמוד הבית', path: '/tzahi/home' },
    { name: 'בחירת סד"פ לחירום', path: '/tzahi/EmergencyRolls' },
    { name: 'הורדת עזרים מודפסים', path: '/tzahi/PdfFiles' },
    { name: 'שיעור דיגיטלי', path: 'https://sites.google.com/view/inri-tzahi/home', external: true },
    { name: 'אודות', path: 'tzahi/Credits', external: true },
  ];

  // עדכון visitedPages בכל מעבר עמוד
  useEffect(() => {
    if (!visitedPages.includes(location.pathname)) {
      const updated = [...visitedPages, location.pathname];
      setVisitedPages(updated);
      sessionStorage.setItem('visitedPages', JSON.stringify(updated));
    }
  }, [location.pathname]);

  const go = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar" dir="rtl">
      <ul className="nav-list">
        {subjects.map((s, idx) => {
          const isActive = location.pathname === s.path;

          return (
            <li
              key={idx}
              className={`nav-item 
                ${isActive ? 'active' : ''} 
                ${visitedPages.includes(s.path) ? 'visited' : ''}`}
              onClick={() => go(s.path)}
            >
              {s.name}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
