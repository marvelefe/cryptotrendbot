import * as types from "@/types/coin";

/**
 * Top five coins by marketcap rankings (Ommited stable coins)
 *
 *
 * @link https://coinmarketcap.com/
 *
 * @return types.Coin[]
 */
export const coins: types.Coin[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
  },
];
