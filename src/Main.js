import { Link } from "react-router-dom";
import List from "./List";
import { useAuth } from "./context/AuthContext";

const Main = () => {
  const { user, logout } = useAuth();
  console.log(user);
  return (
    <div>
      <h1>Main</h1>
      {!user ? (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </>
      ) : (
        <>
          <button onClick={logout}>logout</button>
          <List />
        </>
      )}
    </div>
  );
};

export default Main;
