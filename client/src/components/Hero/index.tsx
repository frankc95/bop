import BookingForm from "@/components/BookingForm";
import MainDialog from "@/components/MainDialog";
// import './index.scss';
import {Box, Typography} from "@mui/material";
import bgImage from '@/assets/suspension.jpeg';

export default function Hero() {
  return (
    <Box
      sx={{
        position: 'relative',  // needed for overlay positioning
        backgroundImage: `url(${ bgImage })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '2rem',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.6)', // semi-transparent black
          zIndex: 1,
        },
      }}
    >
      <Box sx={{position: 'relative', zIndex: 2, maxWidth: 600}}>
        <Typography variant="h1" sx={{fontWeight: 'bold'}}>
          SusCamp'25
        </Typography>
        <Typography variant="h2" sx={{mb: 2, fontWeight: 'bold'}}>
          19-20th July
        </Typography>
        <Typography variant="h5" sx={{mb: 4, maxWidth: '600px'}}>
          Deep in the woods, above ground, with sunlight dappling through the leaves and a gentle breeze, in natures embrace, with the mind and body attuned to earths energy.
        </Typography>
        <MainDialog
          title='Body Suspension – Registration Form'
          actionBtn="Register"
        >
          {(setOpen) => (
            <BookingForm setOpen={setOpen} />
          )}
        </MainDialog>
      </Box>
    </Box >
  );
}
