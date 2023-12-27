import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Patient } from '../types/Patient';
import { patientsApi } from '../services/patients-api';

interface PatientAppProviderProps {
  children: ReactNode;
}

type PatientAppContextType = {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  expandedId: string;
  setExpandedId: React.Dispatch<React.SetStateAction<string>>;
};

const initialContext: PatientAppContextType = {
  patients: [],
  setPatients: () => { },
  expandedId: '',
  setExpandedId: () => { },
};

export const PatientContext = createContext<PatientAppContextType>(initialContext);

export const PatientProvider = (props: PatientAppProviderProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [expandedId, setExpandedId] = useState<string>('');
  const { children } = props;

  useEffect(() => {
    patientsApi
      .fetchPatients()
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error.message);
      });
  }, []);

  return (
    <PatientContext.Provider value={{ patients, setPatients, expandedId, setExpandedId }}>
      {children}
    </PatientContext.Provider>
  );
};