const API_URL = '/api';

export const dataProvider = {
    getList: async (resource) => {
        const res   = await fetch(`${API_URL}/${resource}.php`);
        const data  = await res.json();
        const total = parseInt(res.headers.get('X-Total-Count') || data.length);
        return { data, total };
    },

    getOne: async (resource, { id }) => {
        const res  = await fetch(`${API_URL}/${resource}.php?id=${id}`);
        const data = await res.json();
        return { data };
    },

    getMany: async (resource, { ids }) => {
        const data = await Promise.all(
            ids.map(id =>
                fetch(`${API_URL}/${resource}.php?id=${id}`).then(r => r.json())
            )
        );
        return { data };
    },

    create: async (resource, { data }) => {
        const res  = await fetch(`${API_URL}/${resource}.php`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(data),
        });
        const json = await res.json();
        return { data: json };
    },

    update: async (resource, { id, data }) => {
        const res  = await fetch(`${API_URL}/${resource}.php?id=${id}`, {
            method:  'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(data),
        });
        const json = await res.json();
        return { data: json };
    },

    updateMany: async (resource, { ids, data }) => {
        await Promise.all(
            ids.map(id =>
                fetch(`${API_URL}/${resource}.php?id=${id}`, {
                    method:  'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body:    JSON.stringify(data),
                })
            )
        );
        return { data: ids };
    },

    delete: async (resource, { id }) => {
        await fetch(`${API_URL}/${resource}.php?id=${id}`, { method: 'DELETE' });
        return { data: { id } };
    },

    deleteMany: async (resource, { ids }) => {
        await Promise.all(
            ids.map(id =>
                fetch(`${API_URL}/${resource}.php?id=${id}`, { method: 'DELETE' })
            )
        );
        return { data: ids };
    },
};