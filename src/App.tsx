import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import BookList from "./components/BookList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/books" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
