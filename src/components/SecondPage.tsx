import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import PostsTable from "./PostsTable";
import DepartmentsList from "./DepartmentsList";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Welcome to the Second Page!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here are your details:
      </Typography>
      <Typography variant="body2" gutterBottom>
        Name: {userData?.name || "N/A"}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Phone number: {userData?.phoneNumber || "N/A"}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Email: {userData?.email || "N/A"}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ marginTop: "16px" }}>
        Here are some posts from an API:
      </Typography>
      <PostsTable posts={posts} />
      <Typography variant="body1" gutterBottom sx={{ marginTop: "16px" }}>
        Here are some departments and subDepartments:
      </Typography>

      <DepartmentsList />
    </Box>
  );
};

export default SecondPage;
