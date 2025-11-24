// Small utility function to fetch data from json and make sure the data type is of type <T>

export async function fetchJSON<T>(
    ...args: Parameters<typeof fetch>
): Promise<T> {
    const res = await fetch(...args);
    if (!res.ok) throw new Error("Something's wrong, try again later");

    return res.json() as Promise<T>;
}
