import React, { useContext } from 'react';
import PatientList from '../components/PatientList/PatientList';
import { PatientContext } from '../contexts/App/app-context';
import EditPatientModal from '../components/EditPatientModal/EditPatientModal';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import { Alert, CircularProgress, Container, Snackbar, Typography } from '@mui/material';
import './Home.css';
import { useTheme } from '../contexts/Theme/theme-context';

const Home: React.FC = () => {
  const theme = useTheme();
  const { loading,
    showNotification,
    notificationMessage,
    setShowNotification
  } = useContext(PatientContext);

  const textColor = theme.palette.primary.main;

  const handleSnackbarClose = () => {
    setShowNotification(false);
  };

  return (
    <Container maxWidth="xl">
      {loading ? (
        <div data-testid="loading" className="loading-container">
          <CircularProgress />
          <Typography className="loading-text" color={textColor}>
            Loading...
          </Typography>
        </div>
      ) : (
        <>
          <HomeHeader />
          <PatientList />
          <EditPatientModal />
          <Snackbar
            open={showNotification}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              {notificationMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </Container>
  );
};
export default Home;