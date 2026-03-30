import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import ChampionPage from "./ChampionPage";
import ComparePage from "./ComparePage";
import CustomNavbar from "./components/Navbar";
import LiquidChrome from "./components/LiquidChrome";
import TimelinePage from "./TimelinePage";
import SignUpPage from "./SignUpPage";

function AppContent() {
  const location = useLocation();

  const isSignUpPage = location.pathname === "/signup";

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <LiquidChrome
          baseColor={[0.0, 0.05, 0.1]}
          speed={0.3}
          amplitude={0.4}
          frequencyX={2}
          frequencyY={2}
          interactive={false}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(6, 9, 5, 0.7)",
            pointerEvents: "none",
          }}
        />
      </div>

      {!isSignUpPage && <CustomNavbar />}

      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/champions/:champId" element={<ChampionPage />} />
        <Route path="/compare/:baseChampId" element={<ComparePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
