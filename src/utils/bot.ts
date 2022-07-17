const { TwitterClient } = require("twitter-api-client");
import * as types from "@/types/bot";
import { BotClass, ApiClientClass } from "../types/classes";
import { ApiClient } from "./client";

/**
 * The Bot Class
 *
 * This class handles all of the logic for performing actions with the twitter bot
 *
 * @return types.BotClass
 */
export default class Bot extends BotClass {
  private twitterClient: types.TwitterClient;
  private coinData: types.singleCoinData[] = [];
  private apiClient: ApiClientClass;

  constructor(config: types.TwitterClientConfig) {
    super();
    this.twitterClient = new TwitterClient(config);
    this.apiClient = new ApiClient();
  }

  public async wakeUp(): Promise<void> {
    this.coinData = await this.apiClient.getCoinPrices();
    console.log(this.coinData);
    
    this.schedule();
  }

  private schedule() {
    this.coinData.forEach((coin) => {
      this.startTweeting(this.composeTweet(coin));
    });
  }

  private composeTweet(coin: any): string {
    const { name, USD_PRICE, EUR_PRICE, GBP_PRICE, CNY_PRICE } = coin;
    return `${name} Price ${this.getEmoji(name)}\n 
USD: ${this.formatMoney(USD_PRICE, "USD")}\n
EUR: ${this.formatMoney(EUR_PRICE, "EUR")}\n
GBP: ${this.formatMoney(GBP_PRICE, "GBP")}\n
CNY: ${this.formatMoney(CNY_PRICE, "CNY")}\n
    `;
  }

  protected startTweeting(tweet: string): void {
    this.twitterClient.tweetsV2
      .createTweet({
        text: tweet,
      })
      .then((response: object) => {
        console.log("Tweeted!", response);
      })
      .catch((err: object) => {
        console.error(err);
      });
  }

  private formatMoney(amount: number, currency: string): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  }

  private getEmoji(name: string): string {
    return (
      {
        Bitcoin: "#bitcoin ",
        Ethereum: "⬨",
        BNB: "#BNB",
      }[name] ?? ""
    );
  }
}
