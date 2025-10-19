import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../componentsCss/Messages.css';

const Messages = ({ selectedScenario, currentRole, setShowMessages }) => {
  const navigate = useNavigate(); 
  const [messages, setMessages] = useState(currentRole.messages || []);
  const [activeMessageIndex, setActiveMessageIndex] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");

  // פונקציה לחיתוך חמש המילים הראשונות
  const getPreview = (message) => {
    const words = message.split(" ");
    const preview = words.slice(0, 5).join(" ");
    return preview.length < message.length ? `${preview}...` : preview;
  };

  const handleEditMessage = (index) => {
    setActiveMessageIndex(index);
    setEditedMessage(messages[index]);
  };

  const handleSaveMessage = () => {
    const updatedMessages = [...messages];
    updatedMessages[activeMessageIndex] = editedMessage;
    setMessages(updatedMessages);
    setActiveMessageIndex(null);
    setEditedMessage("");
  };

  const handleSendMessage = () => {
    if (navigator.share) {
      navigator.share({
        title: 'הודעה חדשה',
        text: editedMessage,
      })
        .then(() => alert('ההודעה שותפה בהצלחה!'))
        .catch((error) => console.error('שיתוף נכשל:', error));
    } else {
      alert('הדפדפן שלך לא תומך בשיתוף.');
    }
    setActiveMessageIndex(null);
    setEditedMessage("");
  };

  const handleClose = () => {
    setShowMessages(false); // עדכון הסטייט שגורם לסגירת ההודעות
  };

  return (
    <div className="messages-container">
      <img className='messages-icon'  src={`${process.env.PUBLIC_URL}/assets/iconsGrey/icon${selectedScenario.id}.svg`}  />

      <h1 className="messages-title">הודעות נצורות - {selectedScenario.situation}</h1>
      <button className="close-button" onClick={handleClose}>
      <img
             className="closeImg" src={`${process.env.PUBLIC_URL}/assets/media/closeBlack.png`}
             
            />
      </button>

      {messages.length === 0 ? (
        <p className="no-messages">אין הודעות זמינות</p>
      ) : (
        <div className="messages-list">
          {messages.map((message, index) => (
            <button
              key={index}
              className="message-button"
              onClick={() => handleEditMessage(index)}
            >
              {getPreview(message)}
            </button>
          ))}
        </div>
      )}

      {activeMessageIndex !== null && (
        <div className="message-editor">
          <h2 className="editor-title">עריכת הודעה</h2>
          <textarea
            className="message-textarea"
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
          />
          <div className="editor-actions">
            <button className="save-button" onClick={handleSaveMessage}>
             שמירה 
            </button>
            <button className="send-button" onClick={handleSendMessage}>
              העתקה ושליחה
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
