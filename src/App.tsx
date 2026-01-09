import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatView from "./components/ChatView";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<ChatView />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
