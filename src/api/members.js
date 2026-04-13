
export async function fetchMembers() {
    const res = await fetch('/api/members.php');
    if (!res.ok) throw new Error("Erreur chargement des membres");
    return res.json();
}