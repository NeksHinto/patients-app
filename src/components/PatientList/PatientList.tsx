import React, { useContext } from 'react';
import PatientCard from '../PatientCard/PatientCard';
import { Container, Grid, Box, Typography } from '@mui/material';
import { PatientContext } from '../../contexts/App/app-context';

const PatientList: React.FC = () => {
	const { patients, expandedId, setExpandedId, isMobile } = useContext(PatientContext);

	const handleExpandCard = (id: string) => {
		setExpandedId(expandedId === id ? id : '');
	};

	return (
		<Container data-testid="patient-list" maxWidth="lg" sx={{ padding: isMobile ? 0 : 1 }}>
			<Box
				sx={{
					backgroundColor: '#FFEEB6',
					borderRadius: '4px',
					padding: isMobile ? "0px" : '20px',
				}}
			>
				{patients?.length > 0 ? (
					<Grid container spacing={2} justifyContent="flex-start">
						{patients?.length > 0 &&
							patients.map((patient) => (
								<Grid
									key={patient.id}
									data-testid='patient-card'
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
				) : (
					<Typography data-testid="empty-state" variant="h6" align="center" mt={3}>
						There are no patients registered. Start adding some patients!
					</Typography>
				)}
			</Box>
		</Container>
	);
};

export default PatientList;