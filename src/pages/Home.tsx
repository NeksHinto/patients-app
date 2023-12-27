import React from 'react';
import PatientList from '../components/PatientList/PatientList';
import { PatientProvider } from '../contexts/app-context';

const Home: React.FC = () => {

	return (
		<PatientProvider>
			<PatientList />
		</PatientProvider>
	);
};

export default Home;