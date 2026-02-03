import React from "react";
import ReactDOM from "react-dom/client";

import "@mantine/core/styles.css"; // Mantine base styles FIRST
import "@mantine/notifications/styles.css"; // if you use notifications
import "./index.css"; // your global styles SECOND

import { MantineProvider } from "@mantine/core";
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
