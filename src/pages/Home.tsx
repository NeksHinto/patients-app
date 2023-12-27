import React from 'react';
import PatientList from '../components/PatientList/PatientList';
import { PatientProvider } from '../contexts/App/app-context';
import EditPatientModal from '../components/EditPatientModal/EditPatientModal';
import HomeHeader from '../components/HomeHeader/HomeHeader';

const Home: React.FC = () => {
  return (
    <PatientProvider>
      <HomeHeader />
      <PatientList />
      <EditPatientModal />
    </PatientProvider>
  );
};
export default Home;