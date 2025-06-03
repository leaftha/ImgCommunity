import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import "./styles/login.css";
import "./styles/button.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://13.124.227.234/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const result = await response.json();

      login(result);
      alert("로그인 성공!");
      window.location.href = "/";
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleLogin}>
        <h2>로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-large">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
