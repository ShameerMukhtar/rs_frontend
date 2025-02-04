import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const BlogsTab = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/blogs/get-all-blogs`
        );
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#D7A7AA",
        marginTop: "300px",
      }}
    >
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
          maxWidth: "1200px",
          height: "400px",
          marginTop: "-200px",
        }}
      >
        {blogs.map((blog, index) => (
          <Card
            key={index}
            sx={{
              minWidth: "450px",
              display: "inline-block",
              borderRadius: "12px",
              backgroundColor: "#FFFFFF",
              padding: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              textAlign: "center", // Center the title
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: "#333",
                  textAlign: "center", // Centering the title
                }}
              >
                {blog.title}
              </Typography>
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
                {blog.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default BlogsTab;
