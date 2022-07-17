jest.mock("twitter-api-client", () => {
  return {
    TwitterClient: class testCase {
      constructor() {}
      tweetsV2 = {
        createTweet: createTweet,
      };
    },
  };
});

jest.mock("../utils/client.ts", () => {
  return {
    ApiClient: class testCaseTwo {
      constructor() {}
      getCoinPrices = getCoinPrices;
    },
  };
});

import Bot from "../utils/bot";
import * as types from "@/types/bot";
const getCoinPrices = jest.fn().mockImplementation(() => []);
const createTweet = jest.fn().mockImplementation(() => {
    return new Promise(resolve => {
        resolve('200!')
      });
});



describe("Bot tests", () => {
  var bot: any;
  const mockCoinData = [
    {
      name: "Bitcoin",
      USD_PRICE: 21121,
      EUR_PRICE: 20952,
      GBP_PRICE: 17817.08,
      CNY_PRICE: 142725,
    },
  ];

  beforeAll(() => {
    const config: types.TwitterClientConfig = {
      apiKey: Math.random().toString(),
      apiSecret: Math.random().toString(),
      accessToken: Math.random().toString(),
      accessTokenSecret: Math.random().toString(),
    };
    bot = new Bot(config);
  });

  it("Should create an instance of the twitter client and api client", () => {
    expect(bot["twitterClient"]).not.toBeUndefined();
    expect(bot["apiClient"]).not.toBeUndefined();
  });

  it("Should get coin prices and schedule tweets when wakeUp method is called", async () => {
    const scheduleMethodSpy = jest.spyOn(bot, "schedule");
    await bot.wakeUp();
    expect(getCoinPrices).toHaveBeenCalled();
    expect(scheduleMethodSpy).toHaveBeenCalled();
    scheduleMethodSpy.mockRestore();
  });

  it("Should start tweeting when schedule method is called", () => {
    const startTweetingMethodSpy = jest
      .spyOn(bot, "startTweeting")
      .mockImplementation(() => jest.fn);
    const composeTweetMethodSpy = jest.spyOn(bot, "composeTweet");

    bot["coinData"] = mockCoinData;
    bot["schedule"]();

    expect(startTweetingMethodSpy).toHaveBeenCalled();
    expect(composeTweetMethodSpy).toHaveBeenCalled();
    composeTweetMethodSpy.mockRestore();
    startTweetingMethodSpy.mockRestore();
  });


  it("Should compose the tweet when composeTweet method is called", async () => { 
   const tweet = bot["composeTweet"](mockCoinData[0]); 
   expect(typeof tweet).toBe('string');
   expect(tweet).toContain('Bitcoin Price')
   expect(tweet).toContain('USD')
   expect(tweet).toContain('EUR')
   expect(tweet).toContain('GBP')
   expect(tweet).toContain('CNY') 
  });

  it("Should return a formatted amount when formatMoney method is called", async () => { 
    const amount = bot["formatMoney"](1000, 'USD'); 
    expect(typeof amount).toBe('string'); 
    expect(amount).toBe('$1,000.00'); 
   });


   it("Should return the emoji for a coin if it exists", async () => { 
    const emoji = bot["getEmoji"]('Bitcoin'); 
    expect(typeof emoji).toBe('string'); 
    expect(emoji).toBe('#bitcoin '); 

    const emojiTwo = bot["getEmoji"]('ShitCoin'); 
    expect(typeof emojiTwo).toBe('string'); 
    expect(emojiTwo).toBe(''); 
   });


   it("Should start tweeting when startTweeting method is called", async () => { 
     bot["startTweeting"]('Hello World'); 
     expect(createTweet).toHaveBeenCalled();
   });

});
