import React, {ReactNode} from "react";
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import useMyTheme, {ThemeContextObj, ThemeMode} from "@/hooks/useMyTheme";

export interface Props {
    children: ReactNode;
}

const defaultThemeContext: ThemeContextObj = {
    mode: "light",
    onChangeThemeMode: (t: ThemeMode) => {
    }
}

export const ThemeContext = React.createContext(defaultThemeContext);


export default function CustomThemeProvider(props: Props) {
    const {mode, theme, onChangeThemeMode} = useMyTheme({mode: 'light'})

    return (
        <ThemeContext.Provider value={{mode, onChangeThemeMode}}>
            <MuiThemeProvider theme={theme}>
                {props.children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}