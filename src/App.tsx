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
  description?: string; // Made optional as some items might lack it
  analysis: Analysis;
  date?: string; // Made optional as 'publishedAt' exists in JSON
  publishedAt?: string;
}

function App() {
  // Normalize the data safely
  const data: VideoData[] = (analysisData as any[]).map(item => {
    // Check if it already has the nested structure (like the sample item)
    if (item.analysis) {
      return item as VideoData;
    }

    // Otherwise, map flat structure to nested structure
    return {
      id: item.id,
      title: item.title,
      description: item.description || "",
      date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : (item.date || ""),
      analysis: {
        asset: item.asset,
        jeon_opinion: item.jeon_opinion,
        jeon_logic: item.jeon_logic,
        oracle_signal: item.oracle_signal,
        oracle_logic: item.oracle_logic,
        confidence: item.confidence,
        physiognomy_score: item.physiognomy_score,
        timestamp: item.timestamp
      }
    };
  });

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
