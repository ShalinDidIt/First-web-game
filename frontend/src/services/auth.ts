export async function getUserData(): Promise<{ username: string } | null> {
    const cache = await caches.open('auth-cache');
    const response = await cache.match('authToken');
    if (!response) {
        return null;
    }
    const data = await response.json();
    console.log("data from auth.ts:");
    console.log(data);
    return { username: data.username };
}