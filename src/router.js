import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import List from "./List";
import NewForm from "./NewForm";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<List />} />
        <Route path="/new" element={<NewForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
