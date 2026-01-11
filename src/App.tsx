import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { Footer } from "./components/Footer";
import analysisData from "./data/analysis.json";

// Types matching the component expectations
interface Analysis {
  asset: string;
  jeon_opinion: number;
  jeon_logic: string;
  oracle_signal: "BUY" | "SELL" | "HOLD";
  oracle_logic: string;
  confidence: number;
  physiognomy_score: number;
  timestamp: string;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
  analysis: Analysis;
  date: string;
}

function App() {
  // Cast the imported JSON data to the correct type
  const data = analysisData as unknown as VideoData[];

  return (
    <div className="bg-[#f5f5f7] min-h-screen text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid items={data} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
