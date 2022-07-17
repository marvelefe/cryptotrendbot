const axiosGet = jest.fn(() => { 
    const res = { 
        data: {
            market_data: {
                current_price: {
                    'usd': Math.random(),
                    'eur': Math.random(),
                    'gbp': Math.random(),
                    'cny': Math.random(),
                }
            }
        },
        status: 200
    }
    return new Promise((resolve, reject) => {
        resolve(res);
    })
})

jest.mock("axios", () => {
    return {
      get: axiosGet
    };
  });

import { ApiClient } from "../utils/client";
import * as types from "@/types/client";


describe('Client tests', () => { 
    var client: any; 


    beforeAll(() => { 
        client = new ApiClient();
    });


    it('Should fetch coin prices when getCoinPrices method is called', async () => {
        const fetchCryptoPricesFromGeckoMethodSpy = jest
        .spyOn(client, "fetchCryptoPricesFromGecko")
        .mockImplementation(() => jest.fn);  

      await client["getCoinPrices"]();
  
      expect(fetchCryptoPricesFromGeckoMethodSpy).toHaveBeenCalled(); 
      fetchCryptoPricesFromGeckoMethodSpy.mockRestore();
    })


    it('Should get prices from gecko when fetchCryptoPricesFromGecko method is called', async () => {  
     const res = await client["fetchCryptoPricesFromGecko"]();
     expect(res).not.toBeUndefined()
     expect(axiosGet).toHaveBeenCalled()
    })


 })