import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "../routes/api";
import { useParams } from "react-router-dom";
import CoinExtraInfo from "./CoinExtraInfo";
import styled from "styled-components";

const Container = styled.div``;

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
interface RouteParams {
  coinId: string;
}

export default function PriceList() {
  const { coinId } = useParams<RouteParams>();
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>({
    queryKey: ["tickers", coinId],
    queryFn: () => fetchCoinTickers(coinId),
  });
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
    <Container>
      {extraInfoData.map((info, index) => (
        <CoinExtraInfo key={index} text={info.text} data={info.value} />
      ))}
    </Container>
  );
}
