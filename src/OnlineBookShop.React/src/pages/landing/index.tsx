import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoginButton } from 'features/auth/login';

const FullScreanContainer = styled('div')(({theme}) => ({
	position: 'fixed',
	height: '100%',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: theme.palette.background.default
}));

const Landing = () => {
	return (
		<FullScreanContainer>
			<Box sx={{ width: '100%', maxWidth: 900, textAlign: 'center', color: 'text.primary' }}>
				<Typography variant="h4" gutterBottom component="h4">
					Welcome to the Online Book Shop
				</Typography>
				<Typography variant="subtitle1" gutterBottom component="p">
					Check README.md and try to login:
      	</Typography>
				<Box sx={{ mt: 2 }} />
				<LoginButton></LoginButton>
			</Box>
		</FullScreanContainer>
	);
}

export default Landing;
