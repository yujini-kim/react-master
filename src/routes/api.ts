export async function fetchCoins() {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`
  ).then((res) => res.json());
}

export async function fetchCoinTickers(coinId: string) {
  return fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`).then((res) =>
    res.json()
  );
}

export async function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((res) => res.json());
}
