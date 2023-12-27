import React from 'react';
import PatientList from '../components/PatientList/PatientList';
import { PatientProvider } from '../contexts/app-context';
import EditPatientModal from '../components/EditPatientModal/EditPatientModal';

const Home: React.FC = () => {

	return (
		<PatientProvider>
			<PatientList />
			<EditPatientModal />
		</PatientProvider>
	);
};

export default Home;