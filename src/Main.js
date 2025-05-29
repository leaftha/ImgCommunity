import { Link } from "react-router-dom";
import List from "./List";
import { useAuth } from "./context/AuthContext";
import "./styles/main.css";
import "./styles/button.css";

const Main = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <div className="main-header">
        <h1>Main</h1>
        {user && (
          <button className="btn btn-small" onClick={logout}>
            로그아웃
          </button>
        )}
      </div>
      {!user ? (
        <div className="buttons">
          <Link to="/login" className="btn btn-large">
            로그인
          </Link>
          <Link to="/signup" className="btn btn-large">
            회원가입
          </Link>
        </div>
      ) : (
        <List />
      )}
    </div>
  );
};

export default Main;