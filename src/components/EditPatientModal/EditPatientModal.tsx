import React, { useContext } from 'react';
import { Modal, Box, TextField, Button, Grid, Typography, Stack } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PatientContext } from '../../contexts/App/app-context';

const EditPatientModal: React.FC = () => {
  const {
    editModalOpen,
    setEditModalOpen,
    editedPatient,
    setEditedPatient,
    patients,
    setPatients,
    isMobile
  } = useContext(PatientContext);

  const handleClose = () => {
    setEditedPatient(null);
    setEditModalOpen(false);
  };

  const initialValues = {
    name: editedPatient?.name || '',
    avatar: editedPatient?.avatar || '',
    description: editedPatient?.description || '',
    website: editedPatient?.website || '',
    avatarFile: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required.')
      .max(50, 'Name should be at most 50 characters long.'),
    description: Yup.string()
      .required('Description is required.')
      .max(300, 'Description should be at most 300 characters long.'),
    website: Yup.string()
      .url('Invalid URL format.')
      .required('Website is required.')
      .matches(
        /^(ftp|http|https):\/\/[^ "]+$/,
        'Please enter a valid URL format.'
      ),
  });

  const handleSubmit = (values: any) => {
    if (editedPatient) {
      const updatedPatients = patients.map((pat) =>
        pat.id === editedPatient.id ? { ...pat, ...values } : pat
      );
      setPatients(updatedPatients);
    } else {
      const newConsecutiveId = patients.length > 0 ? Math.max(...patients.map(pat => parseInt(pat.id))) + 1 : 1;
      const newPatient = {
        id: newConsecutiveId.toString(),
        ...values,
      };
      const updatedPatients = [...patients, newPatient];
      setPatients(updatedPatients);
    }
    handleClose();
  };



  return (
    <Modal data-testid="edit-patient-modal" open={editModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 4,
          width: isMobile ? '90%' : '40%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Typography variant="h6" gutterBottom>
                Edit Patient
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Name
                  </Typography>
                  <Field
                    name="name"
                    as={TextField}
                    error={touched.name && !!errors.name}
                    helperText={<ErrorMessage name="name" />}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Avatar URL
                  </Typography>
                  <Field
                    name="avatar"
                    as={TextField}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Description
                  </Typography>
                  <Field
                    name="description"
                    as={TextField}
                    multiline
                    rows={4}
                    error={touched.description && !!errors.description}
                    helperText={<ErrorMessage name="description" />}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Website
                  </Typography>
                  <Field
                    name="website"
                    as={TextField}
                    error={touched.website && !!errors.website}
                    helperText={<ErrorMessage name="website" />}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal >
  );
};

export default EditPatientModal;