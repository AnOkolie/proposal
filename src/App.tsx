import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { TestPage } from "./components/TestPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/proposal/" element={<TestPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
