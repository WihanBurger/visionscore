import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ChampionPage from "./ChampionPage";
import ComparePage from "./ComparePage";
import CustomNavbar from "./components/Navbar";
import LiquidChrome from "./components/LiquidChrome";

function App() {
  return (
    <BrowserRouter>
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1 
      }}>
        <LiquidChrome
          speed={0.3}
          amplitude={0.4}
          frequencyX={3}
          frequencyY={3}
          interactive={false}
        />
      </div>
      <CustomNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champions/:champId" element={<ChampionPage />} />
        <Route path="/compare/:baseChampId" element={<ComparePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
