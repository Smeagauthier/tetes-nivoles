import { useState, useEffect } from "react";
import { fetchHeros } from "../api/heros";

export function useHeros() {
    const [hero, setHero] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            const data = await fetchHeros();
            setHero(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return { hero, loading, error, reload: load };
}