import { Link, useLocation, useParams } from "react-router-dom";
import { Switch, Route, useRouteMatch } from "react-router";
import styled from "styled-components";
import Price from "./Price";

import { useQuery } from "@tanstack/react-query";
import { fetchCoins, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";

interface RouteParams {
  coinId: string;
}
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
const CurrentPrice = styled.span`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;
const PriceChangePercent = styled.div<{ priceChange: number }>`
  background-color: ${(props) =>
    props.priceChange < 0
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
const Img = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;
const ExtraInfo = styled.div``;
const Extra = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
`;
const ExtraInfoText = styled.span``;
const ExtraInfoValue = styled.span`
  font-weight: 600;
`;
const StyledHr = styled.hr`
  border: none;
  height: 1px;
  background-color: #d3d3d3;
  margin: 10px;
`;

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

  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return "∞";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
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
            : tickersData?.name}
        </Title>
      </Header>
      {tickersLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container>
          <InfoBox>
            <Rank>Rank #{tickersData?.market_cap_rank}</Rank>
            <Name>{tickersData?.symbol.toUpperCase()}</Name>
          </InfoBox>
          <Icon>
            <Img src={tickersData?.image?.thumb} alt={tickersData?.name} />
            {tickersData?.name}
          </Icon>
          <PriceInfo>
            <CurrentPrice>
              ${formatNumber(tickersData?.market_data.current_price.bmd)}
            </CurrentPrice>
            <PriceChangePercent
              priceChange={
                tickersData?.market_data.price_change_percentage_24h_in_currency
                  .bmd ?? 0
              }
            >
              {tickersData?.market_data.price_change_percentage_24h_in_currency
                .bmd ?? 0 > 0
                ? "▼"
                : "▲"}
              {formatNumber(
                tickersData?.market_data.price_change_percentage_24h_in_currency
                  .bmd
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
            <Extra>
              <ExtraInfoText>Market Cap</ExtraInfoText>
              <ExtraInfoValue>
                ${formatNumber(tickersData?.market_data.market_cap.bmd)}
              </ExtraInfoValue>
            </Extra>
            <StyledHr />
            <Extra>
              <ExtraInfoText>Fully Diluted Valuation</ExtraInfoText>
              <ExtraInfoValue>
                $
                {formatNumber(
                  tickersData?.market_data.fully_diluted_valuation.bmd
                )}
              </ExtraInfoValue>
            </Extra>
            <StyledHr />
            <Extra>
              <ExtraInfoText>24 Hour Trading Vol</ExtraInfoText>
              <ExtraInfoValue>
                ${formatNumber(tickersData?.market_data.total_volume.bmd)}
              </ExtraInfoValue>
            </Extra>
            <StyledHr />
            <Extra>
              <ExtraInfoText>Circulating Supply</ExtraInfoText>
              <ExtraInfoValue>
                {formatNumber(tickersData?.market_data.circulating_supply)
                  ? Number(tickersData?.market_data.circulating_supply).toFixed(
                      0
                    )
                  : "N/A"}
              </ExtraInfoValue>
            </Extra>
            <StyledHr />
            <Extra>
              <ExtraInfoText>Total Supply</ExtraInfoText>
              <ExtraInfoValue>
                {formatNumber(tickersData?.market_data.total_supply)
                  ? Number(tickersData?.market_data.total_supply).toFixed(0)
                  : "N/A"}
              </ExtraInfoValue>
            </Extra>
            <StyledHr />
            <Extra>
              <ExtraInfoText>Max Supply</ExtraInfoText>
              <ExtraInfoValue>
                {formatNumber(tickersData?.market_data.max_supply)}
              </ExtraInfoValue>
            </Extra>
          </ExtraInfo>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
          </Switch>
        </Container>
      )}
    </>
  );
}

export default Coin;
