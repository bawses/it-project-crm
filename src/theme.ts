import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { COLORS } from './colors';

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
});

export default theme;