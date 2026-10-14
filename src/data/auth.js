export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function post(path, body) {
    let response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
    } catch {
        throw new Error("Server Does not connect. Please try after some time.");
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Something went wrong");
    return data;
}

export const registerUser = (payload) => post("/api/register", payload);
export const loginUser = (payload) => post("/api/login", payload);

export const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        return null;
    }
};
export const saveUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const logoutUser = () => localStorage.removeItem("user");
