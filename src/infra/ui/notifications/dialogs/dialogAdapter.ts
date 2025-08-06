import Swal from 'sweetalert2';

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
