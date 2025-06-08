import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout/index.tsx'
import HomePage from './pages/HomePage/index.tsx'
import AboutPage from './pages/About/index.tsx'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import NavBar from './components/NavBar/index.tsx'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {CssBaseline} from '@mui/material'
import Footer from './components/Footer/index.tsx'

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    background: {
      default: '#242424',
    },
    primary: {
      main: '#101a23',
    },
    secondary: {
      main: '#1466b8',
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/', element: (<Layout
      header={<NavBar />}
      sidebar={<nav>Sidebar Content</nav>}
      footer={<Footer />}
    />
    ),
    children: [
      {index: true, element: <HomePage />},
      {path: 'about', element: <AboutPage />},
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
