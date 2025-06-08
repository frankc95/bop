import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {ReactNode, useState} from 'react';

type MainDialogProps = {
  children: ((setOpen: (open: boolean) => void) => ReactNode) | ReactNode;
  showFooter?: boolean;
  title: string;
  actionBtn: string;
};

export default function MainDialog({
  children,
  showFooter,
  title,
  actionBtn,
}: MainDialogProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="contained"
        size='large'
        sx={{color: 'white', backgroundColor: '#242424', '&:hover': {backgroundColor: '#3a3a3a'}}}
        onClick={() => setOpen(true)}
      >
        {actionBtn}
      </Button>

      <Dialog
        open={open}
        onClose={(_event, reason) => {
          if (reason !== 'backdropClick') {
            handleClose();
          }
        }}
        fullScreen={fullScreen}
        scroll="body"
        slotProps={{
          paper: {
            sx: (theme) => ({
              bgcolor: 'rgba(58, 58, 58, 1)',
              color: '#f0f0f0',
              borderRadius: 2,
              maxWidth: 'none',
              minWidth: 600,
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              border: '1px solid #555',
              [theme.breakpoints.down('md')]: {
                minWidth: 'auto',
              },
            }),
            elevation: 6,
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: '1px solid white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // mb: 2,
          }}
        >
          {title}
          <IconButton onClick={handleClose} sx={{color: 'white'}}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{p: '3rem 1.5rem !important'}}>
          {typeof children === 'function' ? children(setOpen) : children}
        </DialogContent>

        {showFooter && (
          <DialogActions sx={{borderTop: '1px solid white', mt: 2}}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{color: 'white', borderColor: 'white'}}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
