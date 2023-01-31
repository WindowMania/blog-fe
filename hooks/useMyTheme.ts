import {useEffect, useState} from "react";
import {createTheme, Theme} from "@mui/material/styles";
import useMyLocalStorage from '@/hooks/useMyLocalStorage'


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
        },
        chip: {
            primary: {
                main: string
            }
            secondary: {
                main: string
            }
        },
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
        },
        chip: {
            primary: {
                main: string
            }
            secondary: {
                main: string
            }
        },
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


const lightTheme = createTheme({
    bg: {
        primary: {
            main: "#ffffff"
        },
        secondary: {
            main: '#f5f5f5'
        },
    },
    chip: {
        primary: {
            main: "#eaeaea"
        },

        secondary: {
            main: "#bcbcbc"
        }
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
        }
    }
});


const darkTheme = createTheme({
    bg: {
        primary: {
            main: "#181818"
        },
        secondary: {
            main: '#202020'
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
            main: "#FFFFFF",
            highlight: "#ff540f",
            summary: "#a9a9a9"
        },
        secondary: {
            main: "#f0f0f0",
            highlight: "#ff540f",
            summary: "#666"
        }
    },
    border: {
        primary: {
            main: "#313131"
        }
    },

    chip: {
        primary: {
            main: "#202020"
        },

        secondary: {
            main: "#090909"
        }
    },
});


export type ThemeMode = "light" | 'dark'

export interface Props {
    mode?: ThemeMode
}

export interface ThemeContextObj {
    mode: ThemeMode
    onChangeThemeMode: (t: ThemeMode) => void
}


export default function useMyTheme(props?: Props) {
    const {value, setLocalItem} = useMyLocalStorage({key: "kyb_blog_theme", defaultValue: "light"})
    const [mode, setThemeMode] = useState<ThemeMode>("light");
    const [theme, setTheme] = useState<Theme>(lightTheme)

    useEffect(() => {
        if (value !== mode) {
            onChangeThemeMode(value as ThemeMode)
        }
    }, [value])

    function onChangeThemeMode(mode: ThemeMode) {
        let nextTheme: Theme = lightTheme
        let nextThemeMode: ThemeMode = 'light'
        switch (mode) {
            case 'light':
            default:
                nextTheme = lightTheme
                nextThemeMode = "light"
                break
            case "dark":
                nextTheme = darkTheme
                nextThemeMode = 'dark'
                break
        }
        setTheme(nextTheme)
        setThemeMode(nextThemeMode)
        setLocalItem(nextThemeMode)
    }

    return {
        mode,
        theme,
        onChangeThemeMode,
    };
}


