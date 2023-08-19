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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px" }}>
        <DataGrid
          rows={posts}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PostsTable;
