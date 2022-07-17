require("dotenv").config({ path: __dirname.replace('/src', '')+'/.env' });
import Bot from "./utils/bot";
import * as types from "@/types/bot";
import { exit } from "process";

const config: types.TwitterClientConfig = {
  apiKey: process.env.TWITTER_API_KEY!,
  apiSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
};


 console.log('executed app.ts', config);
exit(0);

(async function () {
 await new Bot(config).wakeUp();
})();