import * as types from "../types/client";
import { coins as topCoins } from "../data/coins";
import { currencies } from "../data/currencies";
import { ApiClientClass } from "../types/classes";
import axios from "axios";

/**
 * The Client Class
 *
 * This class handles all of the logic for fetching crypto prices, aggregating data, etc
 *
 * @return types.ApiClientClass
 */
export class ApiClient extends ApiClientClass {
  readonly API_BASE_URL = "https://api.coingecko.com/api/v3";

  public async getCoinPrices(): Promise<types.singleCoinData[]> {
    return await this.fetchCryptoPricesFromGecko();
  }

  protected fetchCryptoPricesFromGecko(): Promise<types.singleCoinData[]> {
    const that = this;
    return new Promise(async function (resolve, reject) {
      const collection:
        | types.singleCoinData
        | PromiseLike<types.singleCoinData>
        | any[] = [];

      for (const coin of topCoins) {
        try {
          const { data, status } = await axios.get<types.coinGeckoResponse>(
            `${that.API_BASE_URL}/coins/${coin.id}`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

          const res: types.singleCoinData = {
            name: coin.name,
          };

          currencies.forEach((currency) => {
            if (currency.toLowerCase() in data.market_data.current_price) {
              res[`${currency}_PRICE` as keyof types.singleCoinData] =
                data.market_data.current_price[currency.toLowerCase()];
            }
          });

          collection.push(res as types.singleCoinData);
        } catch (e) {
          reject(e);
          throw e;
        }
      }

      return resolve(collection);
    });
  }
}