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
          baseColor={[0.0, 0.05, 0.1]}
          speed={0.3}                  
          amplitude={0.4}            
          frequencyX={2}
          frequencyY={2}
          interactive={false}         
        />
        

        <div style={{
          position: 'absolute',
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          background: 'rgba(6, 9, 5, 0.7)',
          pointerEvents: 'none'
        }} />
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
