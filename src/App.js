import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChampionPage from "./ChampionPage";
import CustomNavbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champions/:champId" element={<ChampionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
