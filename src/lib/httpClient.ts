import axios from "axios";

export async function httpClient<T>(url: string): Promise<T> {
  const res = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(`Request failed: ${err}`);
    });

  return res;
}
