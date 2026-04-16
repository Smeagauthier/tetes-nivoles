import { api } from '../services/api';

export async function fetchHeros() {
    const res = await api.get('/heros.php');
    if (!res.ok) throw new Error("Erreur chargement des héros");
    const text = await res.text();
    console.log(text);
    return JSON.parse(text);
}