import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const withThemeProvider = (component: () => React.ReactNode) => () => (
	<>
		<CssBaseline />
		<ThemeProvider theme={darkTheme}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				{component()}
			</LocalizationProvider>
		</ThemeProvider>
	</>
);