
export async function fetchEvents() {
    const res = await fetch('/api/events.php');
    if (!res.ok) throw new Error("Erreur chargement des events");
    return res.json();
}