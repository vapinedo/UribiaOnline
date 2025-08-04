import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

export const toastError = (error: any, message?: string) => {
  toast.error(message || error?.message || 'Ha ocurrido un error');
};

export const toastSuccess = (message: string) => {
  toast.success(message);
};

export const dialogConfirm = (text: string) => {
  return Swal.fire({
    text,
    icon: 'warning',
    title: '¿Estás seguro?',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
  });
};
