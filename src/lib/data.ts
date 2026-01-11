import analysisData from "../data/analysis.json";

// ... imports

export interface Analysis {
    asset: string;
    jeon_opinion: number;
    jeon_logic: string;
    oracle_signal: "BUY" | "SELL" | "HOLD";
    oracle_logic: string;
    confidence: number;
    physiognomy_score: number;
    timestamp: string;
}

export interface VideoData {
    id: string;
    title: string;
    description?: string;
    analysis: Analysis[];
    date?: string;
}

export function getNormalizedData(): VideoData[] {
    return (analysisData as any[]).map(item => {
        // Handle pre-normalized array structure
        if (Array.isArray(item.analysis)) {
            return item as VideoData;
        }

        // Handle pre-normalized single object structure (legacy)
        if (item.analysis && !Array.isArray(item.analysis) && item.analysis.asset) {
            return {
                ...item,
                analysis: [item.analysis]
            } as VideoData;
        }

        // Normalize flat structure to array
        const normalizedAnalysis: Analysis = {
            asset: item.asset,
            jeon_opinion: item.jeon_opinion,
            jeon_logic: item.jeon_logic,
            oracle_signal: item.oracle_signal,
            oracle_logic: item.oracle_logic,
            confidence: item.confidence,
            physiognomy_score: item.physiognomy_score,
            timestamp: item.timestamp
        };

        return {
            id: item.id,
            title: item.title,
            description: item.description || "",
            date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : (item.date || ""),
            analysis: [normalizedAnalysis]
        };
    });
}
