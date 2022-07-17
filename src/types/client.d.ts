export interface singleCoinData {
    name?: string;
    USD_PRICE?: number;
    EURO_PRICE?: number;
    GBP_PRICE?: number;
    CNY_PRICE?: number;
}

export interface coinGeckoResponse { 
  id: string;
  symbol: string;
  name: string; 
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: any[];
  public_notice: null;
  additional_notices: any[]; 
  country_origin: string;
  genesis_date: Date;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: {
    current_price: any;
  };
}
 

export interface tweets {

}
 

