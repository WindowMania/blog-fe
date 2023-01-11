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
            main: '#dadada'
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
            main: "#000000",
            highlight: "#ff540f",
            summary: "#a9a9a9"
        },
        secondary: {
            main: "rgb(73,80,87)",
            highlight: "#ff540f",
            summary: "#666"
        }
    },

    border: {
        primary: {
            main: "#cdcde6"
        },
        secondary: {
            main: "#848383"
        }
    }
});

export default theme;