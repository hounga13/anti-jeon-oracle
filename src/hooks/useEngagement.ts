import { useState, useEffect } from 'react';

// Fake global likes store (simulating global state for demo purposes)
const GLOBAL_VISITS_KEY = 'anti_jeon_global_visits';
const DAILY_VISITS_KEY = 'anti_jeon_daily_visits';
const LAST_VISIT_DATE_KEY = 'anti_jeon_last_visit_date';

// Initial fake data generator
const getInitialLikes = (id: string) => {
    // Deterministic pseudo-random number based on ID string
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 100) + 10;
};

export const useVideoEngagement = (videoId: string) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userAction, setUserAction] = useState<'LIKE' | 'DISLIKE' | null>(null);

    // Load initial state
    useEffect(() => {
        // 1. Load User Action from LocalStorage
        const myAction = localStorage.getItem(`action_${videoId}`);
        if (myAction === 'LIKE' || myAction === 'DISLIKE') {
            setUserAction(myAction);
        }

        // 2. Simulate Global Counts (Random + Local User Action)
        // In a real app, this would fetch from an API
        const baseLikes = getInitialLikes(videoId); // Fake baseline
        const baseDislikes = Math.floor(baseLikes * 0.3); // Fake baseline

        // If user already liked locally, add 1 to the display
        setLikes(baseLikes + (myAction === 'LIKE' ? 1 : 0));
        setDislikes(baseDislikes + (myAction === 'DISLIKE' ? 1 : 0));
    }, [videoId]);

    const toggleLike = () => {
        const newAction = userAction === 'LIKE' ? null : 'LIKE';

        // Update User State
        if (newAction) {
            localStorage.setItem(`action_${videoId}`, 'LIKE');
            setLikes(prev => prev + 1);
            if (userAction === 'DISLIKE') setDislikes(prev => prev - 1);
        } else {
            localStorage.removeItem(`action_${videoId}`);
            setLikes(prev => prev - 1);
        }

        setUserAction(newAction);
    };

    const toggleDislike = () => {
        const newAction = userAction === 'DISLIKE' ? null : 'DISLIKE';

        // Update User State
        if (newAction) {
            localStorage.setItem(`action_${videoId}`, 'DISLIKE');
            setDislikes(prev => prev + 1);
            if (userAction === 'LIKE') setLikes(prev => prev - 1);
        } else {
            localStorage.removeItem(`action_${videoId}`);
            setDislikes(prev => prev - 1);
        }

        setUserAction(newAction);
    };

    return { likes, dislikes, userAction, toggleLike, toggleDislike };
};

export const useVisitorTracker = () => {
    const [dailyVisits, setDailyVisits] = useState(124); // Fake initial
    const [totalVisits, setTotalVisits] = useState(15893); // Fake initial

    useEffect(() => {
        // 1. Date Check for Daily Reset
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem(LAST_VISIT_DATE_KEY);

        // 2. Load Stored Baseline
        const storedDaily = parseInt(localStorage.getItem(DAILY_VISITS_KEY) || '124');
        const storedTotal = parseInt(localStorage.getItem(GLOBAL_VISITS_KEY) || '15893');

        if (lastDate !== today) {
            // New Day: Reset daily, keep total
            localStorage.setItem(LAST_VISIT_DATE_KEY, today);
            localStorage.setItem(DAILY_VISITS_KEY, '1'); // Start from 1 (you)
            setDailyVisits(Math.floor(Math.random() * 50) + 124); // Simulate others viewed
        } else {
            // Same Day: Just show basic + random increment simulation
            setDailyVisits(storedDaily);
            setTotalVisits(storedTotal);
        }

        // 3. Increment "My" visit for this session (simulated by just adding 1 if first load)
        if (!sessionStorage.getItem('visited_session')) {
            sessionStorage.setItem('visited_session', 'true');
            const newTotal = storedTotal + 1;
            const newDaily = storedDaily + 1;

            localStorage.setItem(GLOBAL_VISITS_KEY, newTotal.toString());
            localStorage.setItem(DAILY_VISITS_KEY, newDaily.toString());

            setTotalVisits(newTotal);
            setDailyVisits(newDaily);
        }

    }, []);

    return { dailyVisits, totalVisits };
};
