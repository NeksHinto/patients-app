import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Patient } from '../../types/Patient';
import { patientsApi } from '../../services/patients-api';
import { useMediaQuery, useTheme } from '@mui/material';

interface PatientAppProviderProps {
  children: ReactNode;
}

type PatientAppContextType = {
  loading: boolean;
  isMobile: boolean;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  expandedId: string;
  setExpandedId: React.Dispatch<React.SetStateAction<string>>;
  editModalOpen: boolean;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editedPatient: Patient | null;
  setEditedPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  showNotification: boolean;
  notificationMessage: string;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setNotificationMessage: React.Dispatch<React.SetStateAction<string>>;
};

const initialContext: PatientAppContextType = {
  patients: [],
  isMobile: false,
  setPatients: () => { },
  expandedId: '',
  setExpandedId: () => { },
  editModalOpen: false,
  setEditModalOpen: () => { },
  editedPatient: null,
  setEditedPatient: () => { },
  loading: true,
  showNotification: false,
  notificationMessage: '',
  setShowNotification: () => { },
  setNotificationMessage: () => { },
};

export const PatientContext = createContext<PatientAppContextType>(initialContext);

export const PatientProvider = (props: PatientAppProviderProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedId, setExpandedId] = useState<string>('');
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const { children } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    patientsApi
      .fetchPatients()
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error.message);
        setLoading(false);
      });
  }, []);

  return (
    <PatientContext.Provider
      value={{
        patients,
        setPatients,
        expandedId,
        setExpandedId,
        editModalOpen,
        setEditModalOpen,
        editedPatient,
        setEditedPatient,
        isMobile,
        loading,
        showNotification,
        notificationMessage,
        setShowNotification,
        setNotificationMessage,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
