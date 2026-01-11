import { Hero } from "../components/Hero";
import { BentoGrid } from "../components/BentoGrid";
import { getNormalizedData } from "../lib/data";

export function HomePage() {
    const data = getNormalizedData();

    return (
        <main>
            <Hero />
            <BentoGrid items={data} />
        </main>
    );
}
