import {TextField, TextFieldProps} from '@mui/material';
import {styled} from '@mui/material/styles';

export const StyledTextField = styled((props: TextFieldProps) => <TextField {...props} />)(({theme}) => ({
  bgcolor: 'rgba(58, 58, 58, 1)',
  '& .MuiInputBase-input': {
    color: 'white',
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0 1000px rgba(58, 58, 58, 1) inset`,
      WebkitTextFillColor: 'white',
      transition: 'background-color 5000s ease-in-out 0s',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white',
  },
  '& .MuiInputLabel-shrink': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
}));

