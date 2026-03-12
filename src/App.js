import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChampionPage from "./ChampionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champion/:champId" element={<ChampionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
