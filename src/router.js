import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import NewForm from "./NewForm";
import Post from "./post";
import Login from "./login";
import Signup from "./Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/new" element={<NewForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
