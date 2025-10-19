import React, { useState, useEffect } from 'react';
import '../componentsCss/EmergencyRolls.css';
import Emergency from './Emergency';
import Roles from './Roles';
import Combined from './Combined';
import Evacuation from './Evacuation';

const EmergencyRolls = () => {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    setSelectedRole(null); // Clear selected role when a new scenario is selected
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBackEvent = () => {
    if (selectedRole) {
      setSelectedRole(null); // אם יש תפקיד נבחר, מחזירים את הסטייט לקודם
    } else {
      setSelectedScenario(null); // אם אין תפקיד נבחר, מחזירים את הסצנריו
    }
  };

  const handleEvacuationClick = () => {
    setSelectedRole("evacuation");
  };

  const isEmergencyDisplayed = !selectedScenario && !selectedRole;
  const isRolesDisplayed = selectedScenario && !selectedRole;
  const isCombinedDisplayed = selectedRole && selectedScenario && selectedRole !== "evacuation";
  const isEvacuationDisplayed = selectedRole === "evacuation";

  useEffect(() => {
    const handleEmergencyBack = () => {
      setSelectedScenario(null);
      setSelectedRole(null);
    };

    window.addEventListener("emergencyback", handleEmergencyBack);
    return () => {
      window.removeEventListener("emergencyback", handleEmergencyBack);
    };
  }, []);

  return (
    <div className='page-container'>
      <h1 className='title-sdp'>יש לבחור מצב חירום ותפקיד בצח"י כדי לצפות בסדר פעולות המתאים</h1>
      <div className='states'>
        <div
          className={isEmergencyDisplayed ? 'state1-chosen' : selectedScenario ? 'state1 state-back' : 'state1 '}
          onClick={() => handleScenarioSelect(null)} // מאפיינת מצב חירום
        >
          <img className='Fireicon' src={`${process.env.PUBLIC_URL}/assets/media/fire.svg`} alt="Fire icon" />
          <p className="stateTitle titleOne">בחירת <br /> מצב חירום</p>
        </div>
        
        <div
          className={isRolesDisplayed ? 'state2-chosen' : !selectedScenario && !selectedRole ? 'state2 fade' : 'state2 state-back'}
          onClick={() => setSelectedRole(null)} // מאפיינת תפקיד
        >
          <img className='tzahiicon' src={`${process.env.PUBLIC_URL}/assets/media/tzahiGrey.svg`} alt="Tzahi icon" />
          <p className="stateTitle titleTwo">בחירת <br/> תפקיד</p>
        </div>        
        <div
          className={(isCombinedDisplayed || isEvacuationDisplayed) ? 'state3-chosen' : selectedRole ? 'state3 state-back' : 'state3 fade'}
        >
          <img className='tasksicon' src={`${process.env.PUBLIC_URL}/assets/media/tasksGrey.svg`} alt="Tasks icon" />
          <p className="stateTitle titleThree">משימות ודגשים</p>
        </div>
      </div>

      {isEvacuationDisplayed ? (
        <Evacuation selectedScenario={selectedScenario} />
      ) : isCombinedDisplayed ? (
        <Combined selectedScenario={selectedScenario} selectedRole={selectedRole} />
      ) : isRolesDisplayed ? (
        <Roles
          selectedScenario={selectedScenario}
          onRoleSelect={handleRoleSelect}
          onEvacuationClick={handleEvacuationClick}
        />
      ) : (
        <Emergency onScenarioSelect={handleScenarioSelect} onEvacuationClick={handleEvacuationClick} />
      )}
    </div>
  );
};

export default EmergencyRolls;
