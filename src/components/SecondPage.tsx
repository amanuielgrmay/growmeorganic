import { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ display: "flex", justifyContent: "center" }}
          >
            Welcome to the Second Page!
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", justifyContent: "center" }}
          >
            Here are your details:
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            style={{ display: "flex", justifyContent: "center" }}
          >
            Name: {userData?.name || "N/A"}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            style={{ display: "flex", justifyContent: "center" }}
          >
            Phone number: {userData?.phoneNumber || "N/A"}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            style={{ display: "flex", justifyContent: "center" }}
          >
            Email: {userData?.email || "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", justifyContent: "center" }}
          >
            Here are some posts from an API:
          </Typography>
          <PostsTable posts={posts} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            gutterBottom
            style={{ display: "flex", justifyContent: "center" }}
          >
            Here are some departments and subDepartments:
          </Typography>
          <DepartmentsList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecondPage;
