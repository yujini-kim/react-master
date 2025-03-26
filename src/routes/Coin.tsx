import { Link, useLocation, useParams } from "react-router-dom";
import { Switch, Route, useRouteMatch } from "react-router";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";
import RangeChart from "../Components/RangeChart";

interface RouteParams {
  coinId: string;
}
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 10px;
`;

const Rank = styled.div`
  background-color: #181719;
  padding: 8px;
  border-radius: 3px;
`;
const Name = styled(Rank)``;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  img {
    width: 30px;
    height: 30px;
  }
`;
const CurrentPrice = styled.span`
  font-size: 30px;
  color: lightgreen;
`;
const PriceChangePercent = styled.div<{ priceChange: number }>`
  background-color: ${(props) =>
    props.priceChange < 0
      ? "red"
      : props.priceChange > 0
      ? "lightgreen"
      : "gray"};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;
  color: black;
  padding: 5px;
  border-radius: 5px;
`;
const PriceInfo = styled.div`
  display: flex;
  gap: 50px;
`;
const Img = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

const Chart24h = styled.div``;

const High = styled.div``;

interface RouteState {
  name: string;
}
interface PriceData {
  id: string;
  symbol: string;
  name: string;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  categories: string[];
  market_data: {
    current_price: {
      bmd: number;
    };
    price_change_percentage_24h_in_currency: {
      bmd: number;
    };
    market_cap: {
      bmd: number;
    };
    total_supply: number;
    circulating_supply: number;
    high_24h: {
      bmd: number;
    };
    low_24h: {
      bmd: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
  };
  last_updated: number;
  market_cap_rank: number;
}

interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: number;
  atl: number;
  atl_change_percentage: number;
  atl_date: number;
  last_updated: number;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState | undefined>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });

  const { isLoading, data } = useQuery<ICoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : tickersLoading
            ? "Loading..."
            : tickersData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name
            ? state.name
            : tickersLoading
            ? "Loading..."
            : tickersData?.name}
        </Title>
      </Header>
      {tickersLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <InfoBox>
            <Rank>Rank #{tickersData?.market_cap_rank}</Rank>
            <Name>{tickersData?.symbol.toUpperCase()}</Name>
          </InfoBox>

          <PriceInfo>
            <Icon>
              <Img src={tickersData?.image?.thumb} alt={tickersData?.name} />
              {tickersData?.name}
            </Icon>
            <CurrentPrice>
              ${tickersData?.market_data.current_price.bmd.toLocaleString()}
            </CurrentPrice>
            <PriceChangePercent
              priceChange={
                tickersData?.market_data.price_change_percentage_24h_in_currency
                  .bmd ?? 0
              }
            >
              {tickersData?.market_data.price_change_percentage_24h_in_currency
                .bmd ?? 0 > 0
                ? "⮝ "
                : "⮝ "}
              {tickersData?.market_data.price_change_percentage_24h_in_currency.bmd.toFixed(
                1
              )}
              %
            </PriceChangePercent>
          </PriceInfo>
          <Chart24h>
            <RangeChart />
          </Chart24h>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
