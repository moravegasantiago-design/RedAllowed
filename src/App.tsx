import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatView from "./components/home/ChatView";
import Home from "./components/home/Home";
import Profile from "./components/auth/profile/Profile";
import { RouterProtection } from "./Auth/tsx/ProtectionLayout";
import EmptyScreen from "./components/home/EmptyScreen";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Search } from "lucide-react";

const App = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route element={<RouterProtection />}>
        <Route path="/" element={<Home />}>
          <Route path="Chat/:chatId" element={<ChatView />} />
          <Route index element={<EmptyScreen />} />
        </Route>
        <Route path="/Search" element={<Search />} />
        <Route path="/Profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
