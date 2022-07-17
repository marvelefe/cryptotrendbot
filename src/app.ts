require("dotenv").config({ path: __dirname.replace('/src', '')+'/.env' });
import Bot from "./utils/bot";
import * as types from "@/types/bot";

const config: types.TwitterClientConfig = {
  apiKey: process.env.TWITTER_API_KEY!,
  apiSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
};

(async function () {
 await new Bot(config).wakeUp();
})();