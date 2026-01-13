import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatView from "./components/ChatView";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { RouterProtection } from "./Auth/tsx/ProtectionLayout";

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route element={<RouterProtection />}>
        <Route path="/Home" element={<Home />}>
          <Route path="Chat" element={<ChatView />} />
        </Route>
        <Route path="/Profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
