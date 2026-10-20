export async function gary<T>(url: string, options: RequestInit & {json?: unknown}):Promise<T> {
    const { json, headers, ...rest } = options;

    const res = await fetch(url, {
      ...rest,
      method: rest.method ?? (json !== undefined ? "POST" : "GET"),
      headers: { ...(json !== undefined && { "Content-Type": "application/json" }), ...headers },
      body: json !== undefined ? JSON.stringify(json) : rest.body,
    });
  
    if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
    return res.json() as Promise<T>;
}