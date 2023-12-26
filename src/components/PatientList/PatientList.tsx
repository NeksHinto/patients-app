import React, { useState, useEffect } from 'react';
import PatientCard from '../PatientCard/PatientCard';
import { Patient } from '../../types/Patient';
import { patientsApi } from '../../services/patients-api';

const PatientList: React.FC = () => {
	const [patients, setPatients] = useState<Patient[]>([]);

	useEffect(() => {
		patientsApi.fetchPatients()
			.then((data) => {
				setPatients(data);
			})
			.catch((error) => {
				console.error('Error fetching patients:', error.message);
			});
	}, []);

	return (
		<div>
			{patients?.length > 0 && patients.map((patient) => (
				<PatientCard key={patient.id} patient={patient} />
			))}
		</div>
	);
};

export default PatientList;