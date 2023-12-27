import React, { createContext, useContext, ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { Grid } from '@mui/material';

type ThemeProviderWrapperProps = {
	children: ReactNode;
};

const customTheme: Theme = createTheme({
	palette: {
		primary: {
			main: '#FF6F61',
		},
		secondary: {
			main: '#FFCC5C',
		},
		background: {
			default: '#FFFFFF',
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					textTransform: 'none',
					fontWeight: 600,
					boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
				},
				contained: {
					color: 'white',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
				},
			},
		},
		MuiModal: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
				},
			},
		},
	},
});

const ThemeContext = createContext<Theme>(customTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
	return <ThemeProvider theme={customTheme}>
		<Grid container justifyContent="center" alignItems="center" sx={{ padding: '20px' }}>
			{children}
		</Grid>
	</ThemeProvider>
};

export default ThemeContext;