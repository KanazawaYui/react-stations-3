import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./components/LogIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
