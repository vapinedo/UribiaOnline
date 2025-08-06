import toast from 'react-hot-toast';

export const toastError = (error: any, message?: string) => {
  toast.error(message || error?.message || 'Ha ocurrido un error');
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};
