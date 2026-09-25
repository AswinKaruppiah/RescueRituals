const BIN_URL = `https://api.jsonbin.io/v3/b/${import.meta.env.VITE_JSONBIN_BIN_ID}`;
const API_KEY = import.meta.env.VITE_JSONBIN_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'X-Access-Key': API_KEY,
};

export async function getEvents() {
  const res = await fetch(`${BIN_URL}/latest`, { headers });
  if (!res.ok) throw new Error(`Failed to fetch events (${res.status})`);
  const data = await res.json();
  return data.record || [];
}

export async function saveEvents(events) {
  const res = await fetch(BIN_URL, {
    method: 'PUT',
    headers,
    body: JSON.stringify(events),
  });
  if (!res.ok) throw new Error(`Failed to save events (${res.status})`);
  const data = await res.json();
  return data.record || events;
}
