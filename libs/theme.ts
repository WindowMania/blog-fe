import {blue, lightBlue} from '@mui/material/colors';
import {
    ThemeProvider as MuiThemeProvider,
    Theme,
    StyledEngineProvider,
    createTheme,
} from "@mui/material/styles";


declare module "@mui/material/styles" {
    interface Theme {
        bg: {
            primary: {
                main: string
            }
            secondary: {
                main: string
            }
        },

        border: {
            primary: {
                main: string
            }
            secondary: {
                main: string
            }
        }

        fontColor: {
            primary: {
                main: string
                highlight: string
                summary: string
            }
            secondary: {
                main: string
                highlight: string
                summary: string
            }
        }
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        bg: {
            primary: {
                main: string
            }
            secondary: {
                main: string
            }
        },
        border: {
            primary: {
                main: string
            }
            secondary: {
                main: string
            }
        }

        fontColor: {
            primary: {
                main: string
                highlight: string
                summary: string
            }
            secondary: {
                main: string
                highlight: string
                summary: string
            }
        }
    }
}


const theme = createTheme({
    bg: {
        primary: {
            main: "#f5f5f5"
        },
        secondary: {
            main: '#a9a9a9'
        },
    },
    palette: {
        primary: {
            main: '#3F8AE0'
        },
        secondary: {
            main: '#326eb3'
        },
    },
    fontColor: {
        primary: {
            main: "black",
            highlight: "#ff540f",
            summary: "#666"
        },
        secondary: {
            main: "black",
            highlight: "#ff540f",
            summary: "#666"
        }
    },

    border: {
        primary: {
            main: "#cdcde6"
        },
        secondary: {
            main: "#cdcde6"
        }
    }
});

export default theme;