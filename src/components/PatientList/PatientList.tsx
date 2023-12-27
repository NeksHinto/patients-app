import React, { useContext } from 'react';
import PatientCard from '../PatientCard/PatientCard';
import { Container, Grid, Box } from '@mui/material';
import { PatientContext } from '../../contexts/app-context';

const PatientList: React.FC = () => {
	const { patients, expandedId, setExpandedId } = useContext(PatientContext);

	const handleExpandCard = (id: string) => {
		setExpandedId(expandedId === id ? id : '');
	};

	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					backgroundColor: '#FFEEB6',
					borderRadius: '4px',
					padding: '20px'
				}}
			>
				<Grid container spacing={2} justifyContent="flex-start">
					{patients?.length > 0 &&
						patients.map((patient) => (
							<Grid
								key={patient.id}
								item
								xs={12}
								sm={expandedId === patient.id ? 12 : 6}
								md={expandedId === patient.id ? 12 : 4}
								display="flex"
								justifyContent="center"
							>
								<div style={{ width: '100%' }}>
									<PatientCard
										patient={patient}
										expanded={expandedId === patient.id}
										onExpand={handleExpandCard}
									/>
								</div>
							</Grid>
						))}
				</Grid>
			</Box>
		</Container>
	);
};

export default PatientList;