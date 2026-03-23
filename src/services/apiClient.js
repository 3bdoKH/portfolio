const BASE = process.env.REACT_APP_API_URL;

export const apiFetch = async (path, options = {}) => {
    const res = await fetch(`${BASE}${path}`, options);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
};

export const authFetch = (path, token, options = {}) =>
    apiFetch(path, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });

export const postFetch = (path, body, options = {}) =>
    apiFetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...options.headers },
        body: JSON.stringify(body),
        ...options,
    });
