import { useState } from 'react';

export const useSnackbar = (autoHideDuration: number = 3000) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const showSnackbar = () => setOpenSnackbar(true);
  const handleSnackbarClose = () => setOpenSnackbar(false);

  return {
    openSnackbar,
    showSnackbar,
    autoHideDuration,
    handleSnackbarClose,
  };
};
