
export async function fetchBooks() {
    const res = await fetch('/api/books.php');
    if (!res.ok) throw new Error("Erreur chargement des livres");
    return res.json();
}