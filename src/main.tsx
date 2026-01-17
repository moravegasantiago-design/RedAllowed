import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "../src/Router/ScrollToTop.tsx";
import SocketProvider from "./providers/SocketProvider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <SocketProvider>
        <App />
      </SocketProvider>
    </BrowserRouter>
  </StrictMode>
);
