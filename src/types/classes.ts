import * as types from "./client";

export abstract class ApiClientClass {
    public abstract getCoinPrices(): Promise<types.singleCoinData[]>;  
    protected abstract fetchCryptoPricesFromGecko(): Promise<types.singleCoinData[]>;
  }
  

export abstract class BotClass {
    public abstract wakeUp(): Promise<void>;
    protected abstract startTweeting(tweet: string): void; 
}
  