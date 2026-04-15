
export async function fetchHeros() {
    const res = await fetch('/api/heros.php');
    if (!res.ok) throw new Error("Erreur chargement des héros");
    return res.json();
}