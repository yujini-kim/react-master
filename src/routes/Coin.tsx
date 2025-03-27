import { Link, useLocation, useParams } from "react-router-dom";
import { Switch, Route, useRouteMatch } from "react-router";
import styled from "styled-components";
import Price from "./Price";

import { useQuery } from "@tanstack/react-query";
import { fetchCoins, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";
import Chart from "./Chart";
import CoinExtraInfo from "../component/CoinExtraInfo";
import Coinicon from "../component/CoinIcon";
import CurrentPrice from "../component/CurrentPrice";

interface RouteParams {
  coinId: string;
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 200px;
`;
const CoinInfo = styled.div`
  width: 400px;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid #c0c0c0;
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.05);
  padding: 8px;
  border-radius: 3px;
`;
const Name = styled(Rank)``;
const Icon = styled.div`
  display: flex;
  font-size: 30px;
  img {
    width: 30px;
    height: 30px;
  }
`;

const PriceChangePercent = styled.div<{ priceChange: number }>`
  background-color: ${(props) =>
    props.priceChange > 0
      ? props.theme.decreaseColor
      : props.theme.increaseColor};
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
  gap: 10px;
`;
const ExtraInfo = styled.div``;

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
    max_supply: number;
    total_volume: { bmd: number };
    current_price: {
      bmd: number;
    };
    price_change_percentage_24h_in_currency: {
      bmd: number;
    };
    market_cap: {
      bmd: number;
    };
    fully_diluted_valuation: {
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

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState | undefined>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });

  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return "∞";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const extraInfoData = [
    { text: "Market Cap", value: tickersData?.market_data.market_cap.bmd },
    {
      text: "Fully Diluted Valuation",
      value: tickersData?.market_data.fully_diluted_valuation.bmd,
    },
    {
      text: "24 Hour Trading Vol",
      value: tickersData?.market_data.total_volume.bmd,
    },
    {
      text: "Circulating Supply",
      value: tickersData?.market_data.circulating_supply,
    },
    { text: "Total Supply", value: tickersData?.market_data.total_supply },
    { text: "Max Supply", value: tickersData?.market_data.max_supply },
  ];
  return (
    <>
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
            : tickersData?.name.toUpperCase()}
        </Title>
      </Header>
      {tickersLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container>
          <CoinInfo>
            <InfoBox>
              <Rank>Rank #{tickersData?.market_cap_rank}</Rank>
              <Name>{tickersData?.symbol.toUpperCase()}</Name>
            </InfoBox>
            <Coinicon
              path={tickersData?.image?.thumb}
              name={tickersData?.name}
            />
            <PriceInfo>
              <CurrentPrice
                price={tickersData?.market_data.current_price.bmd}
              />

              <PriceChangePercent
                priceChange={
                  tickersData?.market_data
                    .price_change_percentage_24h_in_currency.bmd ?? 0
                }
              >
                {tickersData?.market_data
                  .price_change_percentage_24h_in_currency.bmd ?? 0 > 0
                  ? "▼"
                  : "▲"}
                {formatNumber(
                  tickersData?.market_data
                    .price_change_percentage_24h_in_currency.bmd
                    ? Number(
                        tickersData.market_data.price_change_percentage_24h_in_currency.bmd.toFixed(
                          1
                        )
                      )
                    : undefined
                )}
                %
              </PriceChangePercent>
            </PriceInfo>
            <ExtraInfo>
              {extraInfoData.map((info, index) => (
                <CoinExtraInfo key={index} text={info.text} data={info.value} />
              ))}
            </ExtraInfo>
          </CoinInfo>
          <ChartContainer>
            <Chart coinId={coinId} />
          </ChartContainer>
        </Container>
      )}
    </>
  );
}

export default Coin;
