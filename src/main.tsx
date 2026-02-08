import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "../src/Router/ScrollToTop.tsx";
import SocketProvider from "./providers/SocketProvider.tsx";
import MeProvider from "./providers/MeProvider.tsx";
import ChatsProvider from "./providers/ChatsProvider.tsx";
import UsersOnlineProvider from "./providers/UsersOnlineProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MeProvider>
        <UsersOnlineProvider>
          <ScrollToTop />
          <SocketProvider>
            <ChatsProvider>
              <App />
            </ChatsProvider>
          </SocketProvider>
        </UsersOnlineProvider>
      </MeProvider>
    </BrowserRouter>
  </StrictMode>
);
