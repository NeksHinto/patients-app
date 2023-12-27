import React from 'react';
import Home from './pages/Home';
import { PatientProvider } from './contexts/App/app-context';

const App: React.FC = () => {
  return (
    <PatientProvider>
      <Home />
    </PatientProvider>
  );
};

export default App;
