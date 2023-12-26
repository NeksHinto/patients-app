import axios, { AxiosError } from 'axios';
import { Patient } from '../types/Patient';

class PatientsApi {
  private cachedPatients: Promise<Patient[]> | null = null;
  private api = axios.create({
    baseURL: 'https://63bedcf7f5cfc0949b634fc8.mockapi.io',
  });

  fetchPatients() {
    if (!this.cachedPatients) {
    this.cachedPatients = this.api.get<Patient[]>('/users')
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error('Request made but server responded with an error:', error.response?.data, error.response?.status, error.response?.headers);
          } else if (error.request) {
            console.error('Request made but no response received:', error.request);
          } else {
            console.error('Error setting up the request:', error.message);
          }
        } else {
          console.error('Unexpected Non-Axios-related error:', error);
        }
        console.log(error.config);
        throw error;
      });
    }

    return this.cachedPatients;
  }
}

export const patientsApi = new PatientsApi();