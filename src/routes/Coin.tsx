import styled from "styled-components";
import { useParams } from "react-router";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchPriceInfo } from "./api";
import { Helmet } from "react-helmet";

// Styled-Components ######################################################################################################
const Title = styled.h1`
  font-family: "Roboto";
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0px 20px;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: ${(props) => props.theme.tabColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  background-color: ${(props) => props.theme.tabColor};

  border-radius: 10px;
  padding: 10px 20px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};

  a {
    display: block;
  }
`;

const PrevButton = styled.div`
  border-radius: 8px;
  background-color: ${(props) => props.theme.tabColor};
  width: 40px;
  height: 20px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  left: 10px;
  top: 40px;
`;

// Interfaces #############################################################################################################
interface Params {
  coinId: string;
}
interface LocationInterface {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: Date;
  last_data_at: Date;
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

interface ICoinProps {
  theme: boolean;
}
function Coin({ theme }: ICoinProps) {
  // const { coinId } = useParams<{ coinId: string }>();
  const { coinId } = useParams<Params>();
  const { state } = useLocation<LocationInterface>();

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchPriceInfo(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const loading = infoLoading || tickersLoading;

  const chartMatch = useRouteMatch("/:coinId/chart");
  const priceMatch = useRouteMatch("/:coinId/price");
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to="/">
          <PrevButton>&larr;</PrevButton>
        </Link>

        <Title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        "Now Loading a Coin Information..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>

          <Description>{infoData?.description}</Description>

          <Overview>
            <OverviewItem>
              <span>total supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>max supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price $</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} theme={theme} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
