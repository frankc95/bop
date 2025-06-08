import {Box, Container, Typography} from '@mui/material';
// import './index.scss';
import Hero from "@/components/Hero";

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <Container maxWidth='xl' sx={{minHeight: '100vh'}}>
        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <Box sx={{position: 'relative', zIndex: 2, maxWidth: 600}}>
            <Typography variant="h1" sx={{mb: 2, fontWeight: 'bold'}}>
              Stay tuned.
            </Typography>
            <Typography variant="h2" sx={{mb: 2, fontWeight: 'bold'}}>
              More content coming soon!
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
