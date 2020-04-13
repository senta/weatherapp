type WeatherUnit = "imperial" | "metric";

type City = {
  name: string;
};

/**
 * Fetch current weather for the city
 */
export function currentWeather(city: string, unit: WeatherUnit) {
  const query = new URLSearchParams();
  query.set("city", city);
  query.set("unit", unit);

  return callAPI("/v1/weather?" + query);
}

/**
 * Search available city names
 */
export async function searchCities(prefix: string) {
  const query = new URLSearchParams();
  query.set("q", prefix);
  query.set("limit", "20");

  const res = await callAPI("/v1/city?" + query);
  return distinctNames(res);
}

/**
 * Pick names from the list of cities and distinct it
 */
function distinctNames(cities: City[]) {
  const names = [];
  const exists = new Set<string>();

  for (let i = 0; i < cities.length; i++) {
    const el = cities[i];
    if (exists.has(el.name)) {
      continue;
    }
    exists.add(el.name);
    names.push(el.name[0].toUpperCase() + el.name.substr(1));
  }
  return names;
}

/**
 * call `fetch` to fetch JSON response
 */
function callAPI(path: string) {
  let url = path;
  if (process.env.NODE_ENV === "development") {
    url = "http://localhost:5000" + path;
  }
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
}
