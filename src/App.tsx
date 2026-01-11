import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { HistoryPage } from "./pages/HistoryPage";

function App() {
  return (
    <Router basename="/anti-jeon-oracle">
      <div className="bg-[#f5f5f7] min-h-screen text-slate-900 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
