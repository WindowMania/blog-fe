import {OptionsObject} from 'notistack'

export const SUCCESS_TOP_MIDDLE_OPTION: OptionsObject = {
    variant: 'success',
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}

export const FAIL_TOP_MIDDLE_OPTION: OptionsObject = {
    variant: 'error',
    anchorOrigin: {
        horizontal: "center",
        vertical: "top"
    }
}


export function restResponseToSnackbar(res: BasicRestResponse, successMessage?: string, failMessage?: string) {
    if (res.ok) {
        return {message: successMessage || res.message, option: SUCCESS_TOP_MIDDLE_OPTION}
    }
    return {message: failMessage || res.message, option: FAIL_TOP_MIDDLE_OPTION}
}