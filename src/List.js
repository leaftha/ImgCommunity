import { Link } from "react-router-dom";

const List = () => {
  const posts = [
    { id: 1, title: "첫 번째 게시물" },
    { id: 2, title: "두 번째 게시물" },
  ];
  return (
    <div>
      <h1>List</h1>
      <Link to="/new">새로운 게시물</Link>
      <h1>게시물 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
