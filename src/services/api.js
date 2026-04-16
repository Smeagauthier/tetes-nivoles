const BASE_URL = '/api';

function getToken() {
    return localStorage.getItem('token');
}

async function request(endpoint, options = {}) {
    const token = getToken();

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${res.status}`);
    }

    return res.json();
}

export const api = {
    get:    (endpoint)         => request(endpoint),
    post:   (endpoint, body)   => request(endpoint, { method: 'POST',   body: JSON.stringify(body) }),
    put:    (endpoint, body)   => request(endpoint, { method: 'PUT',    body: JSON.stringify(body) }),
    delete: (endpoint)         => request(endpoint, { method: 'DELETE' }),
};