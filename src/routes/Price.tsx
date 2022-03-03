import { useQuery } from "react-query";
import { fetchCoinPrice } from "./api";
import styled from "styled-components";

// Interfaces ##############################################################################################################
interface PriceProps {
  coinId: string;
}
interface USD {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

interface Quotes {
  USD: USD;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

// Styled-Components #######################################################################################################
const PriceGird = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin: 25px 0px;
  gap: 10px;
  /* height: 350px; */
  padding: 10px;
  border-style: solid;
  border-color: ${(props) => props.theme.accentColor};
  border-width: 3px;
  border-radius: 10px;
  align-content: space-between;
`;

const PriceTab = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 10px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  span:nth-child(2) {
    font-size: 17px;
    font-weight: 800;
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPriceData>(
    "priceData",
    () => fetchCoinPrice(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const USDDate = data?.quotes.USD;
  return (
    <>
      <PriceGird>
        <PriceTab>
          <span>Price:</span>
          <span>${USDDate?.price.toFixed(2)}</span>
        </PriceTab>
        <PriceTab>
          <span>MC: </span>
          <span>${USDDate?.market_cap}</span>
        </PriceTab>
        <PriceTab>
          <span>MC change 24h:</span>{" "}
          <span>${USDDate?.market_cap_change_24h}</span>
        </PriceTab>
        <PriceTab>
          <span>Percent in 15m:</span>
          <span>{USDDate?.percent_change_15m}%</span>
        </PriceTab>
        <PriceTab>
          <span>Percent in 1h:</span>
          <span>{USDDate?.percent_change_1h}%</span>
        </PriceTab>
        <PriceTab>
          <span>Percent in 24h:</span>
          <span>{USDDate?.percent_change_24h} %</span>
        </PriceTab>
        <PriceTab>
          <span>ATH Price:</span>
          <span>${USDDate?.ath_price.toFixed(2)}</span>
        </PriceTab>
        <PriceTab>
          <span>ATH Date:</span>
          <span>{USDDate?.ath_date.toString().slice(0, 10)}</span>
        </PriceTab>
        <PriceTab>
          <span>ATH Percent:</span>
          <span>{USDDate?.percent_from_price_ath}%</span>
        </PriceTab>
      </PriceGird>
    </>
  );
}

export default Price;
