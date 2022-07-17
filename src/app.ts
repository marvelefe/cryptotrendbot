require("dotenv").config({ path: __dirname.replace('/src', '')+'/.env' });
import Bot from "./utils/bot";
import * as types from "@/types/bot"; 
import express from 'express';

const app = express()
const config: types.TwitterClientConfig = {
  apiKey: process.env.TWITTER_API_KEY!,
  apiSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
};
const PORT : string|number = process.env.PORT || 3000;

app.use("*", async (req, res) =>{
  console.log('...waking up'); 
  await new Bot(config).wakeUp();
});

app.listen(PORT,() => console.log(`bot listening @${PORT}`));