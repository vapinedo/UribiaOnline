import { useRef } from 'react';
import { Button } from '@mui/material';

interface SingleImageUploaderProps {
  image: string | null;
  onImageSelected: (file: File | null) => void;
}

export const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({ image, onImageSelected }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onImageSelected(file);
    }
  };

  const handleRemove = () => {
    onImageSelected(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      {image ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={image} alt="preview" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} />
          <Button size="small" color="error" variant="outlined" onClick={handleRemove}>
            Eliminar
          </Button>
        </div>
      ) : (
        <Button variant="outlined" component="label">
          Examinar imagen
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
        </Button>
      )}
    </div>
  );
};
