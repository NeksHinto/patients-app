import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { PatientContext } from '../../contexts/App/app-context';
import AddIcon from '@mui/icons-material/Add';

const HomeHeader: React.FC = () => {
	const { setEditModalOpen, setEditedPatient } = React.useContext(PatientContext);

	const handleAddPatient = () => {
		setEditedPatient(null);
		setEditModalOpen(true);
	};

	return (
		<Grid container justifyContent="space-between" alignItems="center" mb={2}>
			<Grid item>
				<Typography variant="h4">Patient Data Management</Typography>
			</Grid>
			<Grid item>
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={handleAddPatient}
				>
					Add Patient
				</Button>
			</Grid>
		</Grid>
	);
};

export default HomeHeader;