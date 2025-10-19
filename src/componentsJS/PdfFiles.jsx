import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../componentsCss/PdfFiles.css';

const PdfFiles = () => {
  const navigate = useNavigate();

  const pdfFiles = [
    {
      href: `${process.env.PUBLIC_URL}/assets/docs/assigments.pdf`,
      text: "מעקב משימות",
    },
    {
      href: `${process.env.PUBLIC_URL}/assets/docs/tzahi.pdf`,
      text: 'צוות צח"י על פי מכלולים', 
    },
    {
      href: `${process.env.PUBLIC_URL}/assets/docs/contacs.pdf`,
      text: "דפי קשר",
    },
    {
      href: `${process.env.PUBLIC_URL}/assets/docs/injiured.pdf`,
      text: "טבלת נפגעים",
    },
    {
      href: `${process.env.PUBLIC_URL}/assets/docs/mangement.pdf`,
      text: "טבלת ניהול אירוע",
    },
  ];

  return (
    <div className="homepage-container">
      <h1 className="pdf-title">עזרים מודפסים</h1>
      <p className='intro-pdf'>כאן ניתן להוריד תבניות מוכנות שיסייעו לניהול מיטבי של מצבי חירום
        <b> הדפיסו מראש והתאמנו בשגרה</b>
      </p>

      <div className="pdf-list">
        {pdfFiles.map((file, index) => (
          <div className="pdf-item" key={index}>
            <a href={file.href} download={file.text} className="pdf-link">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                alt="PDF Icon"
                className="pdf-icon"
              />
              <span className="pdf-text">{file.text}</span>
            </a>
          </div>
        ))}
      </div>

      <div className="footer"></div>
    </div>
  );
};

export default PdfFiles;
