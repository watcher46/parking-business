import { useLoginStore } from "@/stores/login";

export const LOGIN_ENDPOINT = `https://parkdemeer-afde952e3fef.herokuapp.com/v1/auth/password`;
export const LOGIN_EMAIL    = 'super@parkdemeer.nl';
export const LOGIN_PASSWORD = 'SUPER_USER_SECRET_PASS';
export const USER_ENDPOINT  = `https://parkdemeer-afde952e3fef.herokuapp.com/v1/auth/me`;


export async function loginUser(email: string, password: string) {
    const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
    });

    return response;
}

export async function fetchUser(token: string) {
    const response = await fetch(USER_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Something went wrong.');
    }

    return await response.json();
}

export function logout(): void {
    const store = useLoginStore();
    store.logout();
}