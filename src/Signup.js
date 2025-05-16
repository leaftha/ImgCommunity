import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      alert("회원가입 성공!");
    } catch (error) {
      alert("오류: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>회원가입</h2>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="닉네임"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">가입하기</button>
    </form>
  );
};

export default Signup;
