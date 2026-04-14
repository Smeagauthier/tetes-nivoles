import { useState, useEffect } from "react";
import { fetchBooks } from "../api/books";

export function useBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        fetchBooks()
            .then(setBooks)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);

    return { books, loading, error };
}