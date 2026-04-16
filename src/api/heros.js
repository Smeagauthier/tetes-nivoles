export async function fetchHeros() {
    const res = await fetch('/api/heros.php');

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    try {
        return JSON.parse(text);
    } catch (e) {
        console.error("JSON ERROR:", e);
        throw e;
    }
}