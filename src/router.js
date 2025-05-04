import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import List from "./List";
import NewForm from "./NewForm";
import Post from "./post";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<List />} />
        <Route path="/new" element={<NewForm />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
