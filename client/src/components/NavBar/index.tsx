import {Link} from "react-router-dom";
import {AppBar, Toolbar, Box, Container} from "@mui/material";
import logo from "@/assets/bop.png";

interface NavBarProps {
  isSticky?: boolean;
}

export default function NavBar({isSticky = false}: NavBarProps) {
  return (
    <>
      {/* Absolute navbar shown only when not sticky */}
      {!isSticky && (
        <AppBar
          position="absolute"
          sx={{
            top: 0,
            left: 0,
            background: 'linear-gradient(to bottom, rgba(36,36,36, .6), rgba(36,36,36,0))',
            boxShadow: "none",
            color: "white",
            zIndex: (theme) => theme.zIndex.appBar + 1,
          }}
        >
          {content}
        </AppBar>
      )}

      {/* Fixed sticky navbar shown only when sticky */}
      <AppBar
        position="fixed"  // keep fixed all the time
        sx={{
          background: 'linear-gradient(to bottom, rgba(36,36,36,1), rgba(36,36,36,0))',
          transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isSticky ? 1 : 0,
          boxShadow: "none",
          transition: 'transform 0.5s ease, opacity 0.5s ease, background 0.5s ease',
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        {content}
      </AppBar>
    </>
  );
}

const content = (
  <Container maxWidth="xl" sx={{p: 2}}>
    <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
      <Box>
        <Link to="/">
          <img src={logo} alt="Logo" style={{height: 70}} />
        </Link>
      </Box>
      {/* <Box sx={{display: "flex", gap: 2}}>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
        <Button component={Link} to="/about" color="inherit">
          About
        </Button>
        <Button component={Link} to="/contact" color="inherit">
          Contact
        </Button>
      </Box> */}
    </Toolbar>
  </Container>
);