import { createTheme } from '@mui/material/styles';
import { blue,lightBlue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: blue.A400
        },
        secondary: {
            main: lightBlue.A400
        }
    },
});

export default theme;