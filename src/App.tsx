import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatView from "./components/ChatView";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { RouterProtection } from "./Auth/tsx/ProtectionLayout";
import EmptyScreen from "./components/EmptyScreen";

const App = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route element={<RouterProtection />}>
        <Route path="/" element={<Home />}>
          <Route path="Chat" element={<ChatView />} />
          <Route index element={<EmptyScreen />} />
        </Route>
        <Route path="/Profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
