export async function fetchJSON<T>(
    ...args: Parameters<typeof fetch>
): Promise<T> {
    const res = await fetch(...args);
    if (!res.ok) throw new Error("Something's wrong, try again later");

    return res.json() as Promise<T>;
}
