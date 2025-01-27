import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const reviews = [
  {
    name: "Cynthia Caroline",
    date: "15 July 2023",
    review:
      "Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla dui. Faucibus pharetra dictum quis feugiat eu augue semper et nulla. Lectus turpis ut et eros tortor placerat rhoncus. Imperdiet purus eu ornare vel. Donec commodo elementum.",
    rating: 5,
  },
  {
    name: "John Doe",
    date: "12 August 2023",
    review:
      "Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla dui. Faucibus pharetra dictum quis feugiat eu augue semper et nulla.",
    rating: 4,
  },
  {
    name: "Jane Smith",
    date: "10 September 2023",
    review:
      "Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla dui. Faucibus pharetra dictum quis feugiat eu augue semper et nulla.",
    rating: 4,
  },
  {
    name: "Alice Johnson",
    date: "20 October 2023",
    review:
      "Lorem ipsum dolor sit amet consectetur. Suspendisse laoreet scelerisque morbi vulputate. Quisque bibendum eget id diam elementum fringilla dui. Faucibus pharetra dictum quis feugiat eu augue semper et nulla.",
    rating: 5,
  },
];

const ReviewsTab = () => {
  return (
    <div style={{width:"100%" , display:"flex", justifyContent:"center", backgroundColor:"#D7A7AA", marginTop:"300px" }}>
      <Box
        sx={{
          backgroundColor: "#FFEBEB",
          padding: "40px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
          gap: "16px",
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Webkit browsers
          },
          maxWidth:"1200px",
          height:"400px",
          marginTop:"-200px"
        }}
      >
        {reviews.map((review, index) => (
          <Card
            key={index}
            sx={{
              minWidth: "450px",
              // maxWidth: "300px",
              display: "inline-block",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              padding: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="10px"
              >
                <Box display="flex" alignItems="center" gap="10px">
                  <Avatar
                    sx={{ backgroundColor: "#A3423C", width: 50, height: 50 }}
                  >
                    {review.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "'Urbanist', sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {review.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#888888",
                      }}
                    >
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" gap="4px">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarIcon
                      key={i}
                      sx={{ color: "#FFD700", fontSize: "20px" }}
                    />
                  ))}
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "'Urbanist', sans-serif",
                  color: "#666666",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {review.review}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default ReviewsTab;
