import {ReactNode, useState, useEffect, cloneElement} from 'react';
import {Outlet} from 'react-router-dom';
import {Box} from '@mui/material';

interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export default function Layout({header, sidebar, footer}: LayoutProps) {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clone the header element to pass isSticky as a prop (assuming NavBar supports it)
  const headerWithSticky = header &&
    (typeof header === 'object' && 'props' in header)
    ? cloneElement(header as React.ReactElement<any>, {isSticky})
    : header;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {headerWithSticky}

      <Box component="main" sx={{flexGrow: 1, overflow: 'hidden'}}>
        <Outlet />
      </Box>

      {footer}
    </Box>
  );
}
