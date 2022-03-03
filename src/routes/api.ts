const BASE_URI = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URI}/coins`).then((res) => res.json());
}

export function fetchCoinInfo(coinID: string) {
  return fetch(`${BASE_URI}/coins/${coinID}`).then((res) => res.json());
}

export function fetchPriceInfo(coinID: string) {
  return fetch(`${BASE_URI}/tickers/${coinID}`).then((res) => res.json());
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 3;
  return fetch(
    `${BASE_URI}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((res) => res.json());
}

export function fetchCoinToday(coinId: string) {
  return fetch(`${BASE_URI}/coins/${coinId}/ohlcv/today`).then((res) =>
    res.json()
  );
}

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URI}/tickers/${coinId}?quotes=USD`).then((res) =>
    res.json()
  );
}
