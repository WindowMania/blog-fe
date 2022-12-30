import MuiSnackbar, {SnackbarOrigin as MuiSnackbarOrigin} from '@mui/material/Snackbar';
import MuiAlert, {AlertProps, AlertColor} from '@mui/material/Alert';
import {SyntheticEvent, useEffect, useState} from "react";

const Snackbar = MuiSnackbar
export default Snackbar

export interface SnackbarOrigin extends MuiSnackbarOrigin {
}


export interface AlertSnackbarProps {
    stamp: number
    message: string
    autoHideDuration?: number
    snackbarOrigin?: SnackbarOrigin
    severity?: AlertColor
    onClose?: () => void
}

export function AlertAutoSnackbar(props: AlertSnackbarProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [stamp, setStamp] = useState<number>(props.stamp)

    const snackbarOrigin = props.snackbarOrigin ?? {
        vertical: "top",
        horizontal: "center"
    }
    const autoHideDuration = props.autoHideDuration ?? 3000

    useEffect(() => {
        if (stamp != props.stamp) {
            setOpen(true)
            setStamp(props.stamp)
        }
    }, [props.stamp])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false)
        event?.stopPropagation()
        props.onClose?.()
    }

    return (
        <Snackbar
            anchorOrigin={{vertical: snackbarOrigin.vertical, horizontal: snackbarOrigin.horizontal}}
            open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={props.severity ?? "success"} sx={{width: '100%'}}>
                {props.message}
            </MuiAlert>
        </Snackbar>
    )
}