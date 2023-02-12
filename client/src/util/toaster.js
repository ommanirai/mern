import { toast } from 'react-toastify'

const showSuccess = (msg) => {
    toast.success(msg);
}

const showInfo = (msg) => {
    toast.info(msg);
}

const showWarning = (msg) => {
    toast.warn(msg);
}

const showError = (msg) => {
    toast.error(msg);
}

export const notify = {
    showError,
    showSuccess,
    showInfo,
    showWarning
}
