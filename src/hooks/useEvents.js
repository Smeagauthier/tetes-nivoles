import { useState, useEffect } from "react";
import { fetchEvents } from "../api/events";

export function useEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        fetchEvents()
            .then(setEvents)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { events, loading, error };
}