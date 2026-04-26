import { api } from '../services/api';

export async function fetchHeros() {
    return await api.get('/heros.php');
}