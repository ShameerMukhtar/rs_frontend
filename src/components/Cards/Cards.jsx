import { Grid, Typography, Box } from "@mui/material";

const CardItem = ({ image, text }) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor:"pointer",
        transition: "transform 0.3s ease-in-out", // Add smooth scale effect
        "&:hover": {
          transform: "scale(1.05)", // Scale effect on hover
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black transparent overlay
          transition: "opacity 0.3s ease", // Smooth transition
          opacity: 1, // Default overlay opacity
        },
        "&:hover::after": {
          opacity: 0.7, // Slightly lighter overlay on hover
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          position: "relative",
          color: "white",
          zIndex: 1, // Ensure text is above the overlay
          fontWeight: "bold",
          textTransform: "uppercase",
          
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const ResponsiveCardGrid = () => {
  const cards = [
    {
      image: "/images/product.svg", // Replace with your image
      text: "Formal Woman",
    },
    {
      image: "/images/product.svg", // Replace with your image
      text: "Most Seller",
    },
    {
      image: "/images/product.svg", // Replace with your image
      text: "Casual Style",
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: { xs: "auto", md: "100vh" }, // Auto height for small screens
        padding: "40px",
      }}
    >
      {/* Left Column with Two Stacked Cards */}
      <Grid item xs={12} md={6}>
        <Grid
          container
          spacing={2}
          sx={{
            height: { xs: "auto", md: "100%" },
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              height: { xs: "350px", md: "50%" }, // 350px on small screens
            }}
          >
            <CardItem image={cards[0].image} text={cards[0].text} />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              height: { xs: "350px", md: "50%" }, // 350px on small screens
            }}
          >
            <CardItem image={cards[1].image} text={cards[1].text} />
          </Grid>
        </Grid>
      </Grid>

      {/* Right Column with One Full-Height Card */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: { xs: "350px", md: "100%" , paddingBottom:"16px" , }, // 350px on small screens
        }}
      >
        <CardItem image={cards[2].image} text={cards[2].text} />
      </Grid>
    </Grid>
  );
};

export default ResponsiveCardGrid;
