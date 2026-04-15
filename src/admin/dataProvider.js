// const API_URL = '/api';
//
// const normalizeData = (data) => {
//     const newData = { ...data };
//
//     ['cover_image', 'back_cover_image', 'photo'].forEach(field => {
//         if (Array.isArray(newData[field])) {
//             newData[field] = newData[field][0]?.url ?? null;
//         } else if (newData[field]?.url) {
//             newData[field] = newData[field].url;
//         }
//     });
//
//     if (Array.isArray(newData.images)) {
//         newData.images = newData.images.map(img =>
//             typeof img === 'string' ? { url: img } : img
//         );
//     }
//
//     return newData;
// };
//
// export const dataProvider = {
//     getList: async (resource) => {
//         const res   = await fetch(`${API_URL}/${resource}.php`);
//         const data  = await res.json();
//         const total = parseInt(res.headers.get('X-Total-Count') || data.length);
//         return { data, total };
//     },
//
//     getOne: async (resource, { id }) => {
//         const res  = await fetch(`${API_URL}/${resource}.php?id=${id}`);
//         const data = await res.json();
//         return { data };
//     },
//
//     getMany: async (resource, { ids }) => {
//         const data = await Promise.all(
//             ids.map(id =>
//                 fetch(`${API_URL}/${resource}.php?id=${id}`).then(r => r.json())
//             )
//         );
//         return { data };
//     },
//
//     create: async (resource, { data }) => {
//         const res  = await fetch(`${API_URL}/${resource}.php`, {
//             method:  'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body:    JSON.stringify(normalizeData(data)),
//         });
//         const json = await res.json();
//         return { data: json };
//     },
//
//     update: async (resource, { id, data }) => {
//         const res  = await fetch(`${API_URL}/${resource}.php?id=${id}`, {
//             method:  'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body:    JSON.stringify(normalizeData(data)),
//         });
//         const json = await res.json();
//         return { data: json };
//     },
//
//     updateMany: async (resource, { ids, data }) => {
//         await Promise.all(
//             ids.map(id =>
//                 fetch(`${API_URL}/${resource}.php?id=${id}`, {
//                     method:  'PUT',
//                     headers: { 'Content-Type': 'application/json' },
//                     body:    JSON.stringify(data),
//                 })
//             )
//         );
//         return { data: ids };
//     },
//
//     delete: async (resource, { id }) => {
//         await fetch(`${API_URL}/${resource}.php?id=${id}`, { method: 'DELETE' });
//         return { data: { id } };
//     },
//
//     deleteMany: async (resource, { ids }) => {
//         await Promise.all(
//             ids.map(id =>
//                 fetch(`${API_URL}/${resource}.php?id=${id}`, { method: 'DELETE' })
//             )
//         );
//         return { data: ids };
//     },
//
// };

const API_URL = '/api';

const getToken = () => localStorage.getItem('token');

const httpClient = async (url, options = {}) => {
    const token = getToken();

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    });

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = new Error('HTTP Error');
        error.status = response.status;
        throw error;
    }

    return response;
};

const normalizeData = (data) => {
    const newData = { ...data };

    ['cover_image', 'back_cover_image', 'photo'].forEach(field => {
        if (Array.isArray(newData[field])) {
            newData[field] = newData[field][0]?.url ?? null;
        } else if (newData[field]?.url) {
            newData[field] = newData[field].url;
        }
    });

    if (Array.isArray(newData.images)) {
        newData.images = newData.images.map(img =>
            typeof img === 'string' ? { url: img } : img
        );
    }

    return newData;
};

export const dataProvider = {
    getList: async (resource) => {
        const res = await httpClient(`${API_URL}/${resource}.php`);
        const data = await res.json();

        const total = parseInt(res.headers.get('X-Total-Count') || data.length);

        return { data, total };
    },

    getOne: async (resource, { id }) => {
        const res = await httpClient(`${API_URL}/${resource}.php?id=${id}`);
        const data = await res.json();
        return { data };
    },

    getMany: async (resource, { ids }) => {
        const data = await Promise.all(
            ids.map(id =>
                httpClient(`${API_URL}/${resource}.php?id=${id}`).then(r => r.json())
            )
        );
        return { data };
    },

    create: async (resource, { data }) => {
        const res = await httpClient(`${API_URL}/${resource}.php`, {
            method: 'POST',
            body: JSON.stringify(normalizeData(data)),
        });

        const json = await res.json();
        return { data: json };
    },

    update: async (resource, { id, data }) => {
        const res = await httpClient(`${API_URL}/${resource}.php?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(normalizeData(data)),
        });

        const json = await res.json();
        return { data: json };
    },

    updateMany: async (resource, { ids, data }) => {
        await Promise.all(
            ids.map(id =>
                httpClient(`${API_URL}/${resource}.php?id=${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                })
            )
        );

        return { data: ids };
    },

    delete: async (resource, { id }) => {
        await httpClient(`${API_URL}/${resource}.php?id=${id}`, {
            method: 'DELETE',
        });

        return { data: { id } };
    },

    deleteMany: async (resource, { ids }) => {
        await Promise.all(
            ids.map(id =>
                httpClient(`${API_URL}/${resource}.php?id=${id}`, {
                    method: 'DELETE',
                })
            )
        );

        return { data: ids };
    },
};