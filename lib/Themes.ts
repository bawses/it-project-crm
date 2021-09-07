import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { COLORS } from './Colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    // Nav bar blue
    primary: {
      main: COLORS.primaryBlue,
    },
    // Action button orange
    secondary: {
      main: COLORS.actionOrange,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;