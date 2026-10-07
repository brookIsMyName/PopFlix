// Reuse the existing catalogue token when no local credential is configured.
const existingReadToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2M5MGNmN2FkNjJjMDFiZDMzNWRmOGI3MzFmMjI0NiIsIm5iZiI6MTc1MzQyMjU4My4zNDIwMDAyLCJzdWIiOiI2ODgzMWFmNzNjZjEwMDYwMGI1MmEyYmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZjYway4Ke9u0ycZri1KiXy_TPoT-1xjFDak0dl0nLzc";
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const readToken = import.meta.env.VITE_TMDB_READ_TOKEN || existingReadToken;

export async function tmdbFetch(path) {
  const url = new URL(path, "https://api.themoviedb.org/3/");
  url.searchParams.delete("api_key");
  const headers = { accept: "application/json" };
  if (apiKey) url.searchParams.set("api_key", apiKey);
  else headers.Authorization = `Bearer ${readToken}`;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(response.status === 401
      ? "TMDB authentication failed. Configure a valid VITE_TMDB_API_KEY or VITE_TMDB_READ_TOKEN in .env.local."
      : `TMDB request failed (${response.status}). Please try again.`);
  }
  return response;
}

export async function tmdbGet(path) {
  const response = await tmdbFetch(path);
  return { data: await response.json() };
}
