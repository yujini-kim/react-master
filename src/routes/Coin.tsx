import { Link, useLocation, useParams } from "react-router-dom";
import { Switch, Route, useRouteMatch } from "react-router";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";
import Chart from "./Chart";
import Coinicon from "../component/CoinIcon";
import CurrentPrice from "../component/CurrentPrice";
import PercentBox from "../component/PercentBox";
import PriceList from "../component/PriceList";

interface RouteParams {
  coinId: string;
}
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  flex-direction: column;
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

const PriceInfo = styled.div`
  display: flex;
  gap: 10px;
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

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState | undefined>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });

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
              fontSize="30px"
            />
            <PriceInfo>
              <CurrentPrice
                fontsize="38px"
                fontWeight={600}
                price={tickersData?.market_data.current_price.bmd}
              />
              <PercentBox
                priceChange={
                  tickersData?.market_data
                    .price_change_percentage_24h_in_currency.bmd ?? 0
                }
              />
            </PriceInfo>
            <PriceList />
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
