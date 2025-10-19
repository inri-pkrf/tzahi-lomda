import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Messages from './Messages.jsx';
import '../componentsCss/Combined.css';

const Combined = ({ selectedScenario, selectedRole }) => {
  const navigate = useNavigate();

  const initialRoleIndex = selectedScenario.roles.findIndex(
    (role) => role.role === selectedRole.role
  );
  const [currentRoleIndex, setCurrentRoleIndex] = useState(initialRoleIndex >= 0 ? initialRoleIndex : 0);
  const [completedTasks, setCompletedTasks] = useState({});
  const [viewState, setViewState] = useState({
    hasMovedNext: false,
    showNotes: false,
    showMessages: false,
  });

  useEffect(() => {
    const currentRole = selectedScenario.roles[currentRoleIndex];
    const tasksByPhases = currentRole.tasksByPhases || {};
    const initialTasks = Object.keys(tasksByPhases).reduce((acc, phase) => {
      acc[phase] = new Array(tasksByPhases[phase].length).fill(false);
      return acc;
    }, {});
    setCompletedTasks(initialTasks);
  }, [currentRoleIndex, selectedScenario]);

  const handleCheckboxChange = useCallback((phase, index) => {
    setCompletedTasks((prevTasks) => ({
      ...prevTasks,
      [phase]: [
        ...prevTasks[phase].slice(0, index),
        !prevTasks[phase][index],
        ...prevTasks[phase].slice(index + 1),
      ],
    }));
  }, []);

  const areAllTasksCompleted = (phase) =>
    completedTasks[phase]?.every((task) => task);

  const handleRoleChange = (step) => {
    setCurrentRoleIndex((prevIndex) => (prevIndex + step + selectedScenario.roles.length) % selectedScenario.roles.length);
    setViewState((prevState) => ({ ...prevState, hasMovedNext: true }));
  };

  const handleBackClick = () => {
    window.dispatchEvent(new CustomEvent("emergencyback"));
  };

  const toggleViewState = (key) => {
    setViewState((prevState) => ({ ...prevState, [key]: !prevState[key] }));
  };

  const currentRole = selectedScenario.roles[currentRoleIndex];
  const tasksByPhases = currentRole.tasksByPhases || {};

  if (viewState.showMessages) {
    return <Messages selectedScenario={selectedScenario} currentRole={currentRole} setShowMessages={() => toggleViewState('showMessages')} />;
  }

  return (
    <div id="combined-container">
      <div id="both-selected">
        <div className="scenerio-chose">
          <h1 className="combined-title">{selectedScenario.situation}</h1>
          <img
            className="icon-sce"
            src={`${process.env.PUBLIC_URL}/assets/iconsGrey/icon${selectedScenario.id}.svg`}
            alt={`${selectedScenario.situation} icon`}
          />
        </div>
        <h1 className="combined-role" style={{ background: currentRole.color }}>
          תפקיד: {currentRole.role || 'לא זוהה'}
        </h1>

        {currentRole.role === "מידע לציבור" && currentRole.messages && (
          <button onClick={() => toggleViewState('showMessages')} className="messages-button">
               <img
                className="mail-icon"
                src={`${process.env.PUBLIC_URL}/assets/media/mail.png`}
        
              />
            <span className="rotated-text">הודעות נצורות</span>
          </button>
        )}

        <div className="navigation-buttons">
          {viewState.hasMovedNext && (
            <div className="nav-button-container">
              <img
                className="navBtn back"
                src={`${process.env.PUBLIC_URL}/assets/media/next.png`}
                onClick={() => handleRoleChange(-1)}
                alt="Previous Role"
              />
              <p className="nav-button-text back-txt">תפקיד קודם</p>
            </div>
          )}
          <div className="nav-button-container">
            <img
              className="navBtn next"
              src={`${process.env.PUBLIC_URL}/assets/media/next.png`}
              onClick={() => handleRoleChange(1)}
              alt="Next Role"
            />
            <p className="nav-button-text next-txt">תפקיד הבא</p>
          </div>
        </div>
     
{/* 
        <div className="noted">
          <h2 className="notes-title" onClick={() => toggleViewState('showNotes')}>
            דגשים
            <img
              src={`${process.env.PUBLIC_URL}/assets/media/nextBlack.png`}
              className={`arrow ${viewState.showNotes ? 'down next-black' : 'right next-black'}`}
              alt="Toggle Notes"
            />
          </h2>
          {viewState.showNotes && (
            <ul className="notes-list">
              {selectedScenario.notes.map((note, index) => (
                <li key={index} className="note-item">{note}</li>
              ))}
            </ul>
          )}
        </div> */}

        {Object.entries(tasksByPhases).map(([phase, phaseTasks], phaseIndex) => (
          <div key={phaseIndex} className="phase-container">
            <h2 className={`sub-title ${areAllTasksCompleted(phase) ? 'checked-title' : ''}`}>{phase}:</h2>
            <ul className="tasks-list">
              {phaseTasks.map((task, index) => (
                <li key={index} className="task-item">
                  <input
                    className="mine-checkbox"
                    type="checkbox"
                    checked={completedTasks[phase]?.[index] || false}
                    onChange={() => handleCheckboxChange(phase, index)}
                  />
                  <span className="task-text">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="buffer">
          <a className="back-emergency" onClick={handleBackClick}>
            חזרה לבחירת מצב חירום
          </a>
          <button className="pdf-go-emergency" onClick={() => navigate("/tzahi/PdfFiles")}>
            עזרים מודפסים
            <img 
              className="download-icon-em" 
              src={`${process.env.PUBLIC_URL}/assets/media/download.png`} 
              alt="Download Icon" 
            />
            </button>
         
        </div>
      </div>
    </div>
  );
};

export default Combined;
