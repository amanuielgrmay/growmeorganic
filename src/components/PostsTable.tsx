// @ts-nocheck
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsTableProps {
  posts: Post[];
}

const PostsTable = ({ posts }: PostsTableProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 120 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 400 },
  ];

  return (
    <DataGrid
      rows={posts}
      columns={columns}
      pageSize={10}
      autoHeight
      sx={{ width: "900px", marginTop: "16px" }}
    />
  );
};

export default PostsTable;
