import { useState, useEffect } from "react";
import { fetchMembers } from "../api/members";

export function useMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        fetchMembers()
            .then(setMembers)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { members, loading, error };
}