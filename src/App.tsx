import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { landingPage as LandingPage } from "./components/landingPage";
import { StartingPage } from "./components/StartingPage";
import { QuestionPage } from "./components/QuestionPage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

export default function App() {
  return (
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <div className="App">
          <h1>Trivia</h1>
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/game" element={<StartingPage />} />
          <Route path="/proposal" element={<QuestionPage />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
