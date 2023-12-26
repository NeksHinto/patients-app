import React, { useState } from 'react';
import { Patient } from '../../types/Patient';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h3>{patient.name}</h3>
      <img src={patient.avatar} alt={patient.name} />
      <button onClick={handleToggle}>
        {expanded ? 'Collapse' : 'Expand'}
      </button>
      {expanded && (
        <div>
          <p>{patient.description}</p>
          <p>Website: {patient.website}</p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;