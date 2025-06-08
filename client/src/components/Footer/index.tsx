import {Box, Container, Typography} from "@mui/material";
// import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#242424",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body2">© {new Date().getFullYear()} Bliss of Pain</Typography>

        {/* <Box sx={{display: "flex", gap: 2}}>
          <Button component={Link} to="/privacy" sx={linkStyle}>
            Privacy
          </Button>
          <Button component={Link} to="/terms" sx={linkStyle}>
            Terms
          </Button>
          <Button component={Link} to="/contact" sx={linkStyle}>
            Contact
          </Button>
        </Box> */}
      </Container>
    </Box>
  );
}

// const linkStyle: React.CSSProperties = {
//   color: "white",
//   textDecoration: "none",
//   fontSize: "0.875rem",
// };
