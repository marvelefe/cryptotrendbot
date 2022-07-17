export interface TwitterClientConfig {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}

export interface TwitterClient {
  tweetsV2: {
    createTweet: Function;
  };
}

export interface tweets {}

export interface singleCoinData {}

